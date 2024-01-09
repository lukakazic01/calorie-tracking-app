import type {Request, Response} from "express";
import type {HydratedDocument} from "mongoose";
import type {UserI} from "../interfaces/User";
import type {IFood} from "../interfaces/Food";
import type {CaloriesByDayI} from "../interfaces/CaloriesByDay";
const User = require('../models/user')
const FoodEntry = require('../models/food');
const {getDateBeforeSevenDays, getDateBeforeTwoWeeks} = require('../utils/dates')
module.exports = {
    getFood: async (req: Request, res: Response): Promise<Response> => {
        const {email, startDate, endDate} = req.query
        try {
            const user: HydratedDocument<UserI | null>  = await User.findOne({email})
            if(endDate || startDate) {
                    const query = {
                        date: {
                            ...(startDate ? { $gte: new Date(startDate as string) } : {}),
                            ...(endDate ? { $lte: new Date(endDate as string) } : {})
                        }
                    }
                    const allFoodEntries: IFood[] | null = await FoodEntry.find({user: user._id, ...query}).select('-user').lean()
                    return res.status(200).send({status: 'success', allFoodEntries})

            } else {
                const allFoodEntries: IFood[] | null = await FoodEntry.find({user: user._id}).select('-user').lean()
                return res.status(200).send({status: 'success', allFoodEntries})
            }
        } catch(err) {
            return res.status(400).send({status: 'error', error: err})
        }

    },
    addFoodEntry: async (req: Request, res: Response): Promise<Response> => {
        const {email, name, date, price, calories} = req.body;
        try {
            const user = await User.findOne({email})
            const foodEntry: HydratedDocument<IFood> = new FoodEntry({name, date: new Date(date), price, calories, user})
            await foodEntry.save()
            return res.status(201).send(foodEntry)
        } catch(err) {
            return res.status(400).send(err)
        }
    },
    deleteFoodEntry: async (req: Request, res: Response): Promise<Response> => {
        const { id } = req.query;
        try {
            const foodEntry: HydratedDocument<IFood | null> = await FoodEntry.findById(id)
            await foodEntry.deleteOne()
            return res.status(200).send({status: 'success', foodEntry})
        } catch(err) {
            return res.status(409).send({status: 'error', error: err})
        }
    },
    updateFoodEntry: async (req: Request, res: Response): Promise<Response> => {
        const {email, name, date, price, calories, _id} = req.body;
        try {
            const foodEntry: HydratedDocument<IFood | null> = await FoodEntry.findOneAndUpdate({_id}, {name, date: new Date(date), price, calories}, {new: true, runValidators: true})
            await foodEntry.save()
            return res.status(201).send({status: 'success', foodEntry})
        } catch(err) {
            return res.status(409).send(err)
        }
    },
    caloriesByDay: async (req: Request, res: Response): Promise<Response> => {
        const {email} = req.query
        try {
            const user: HydratedDocument<UserI | null> = await User.findOne({email})
            const caloriesByDay: CaloriesByDayI[] = await FoodEntry.aggregate([
                {
                    $match: {"user": user._id}
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%d/%m/%Y", date: "$date" } },
                        totalAmount: {$sum: "$calories"}
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        totalAmount: 1
                    }
                }
            ])
            caloriesByDay.sort((a: CaloriesByDayI,b: CaloriesByDayI): number => {
                const firstDate = a.date.split("/").reverse().join("")
                const secondDate = b.date.split("/").reverse().join("")
                if(firstDate < secondDate) return -1;
                if(firstDate > secondDate) return 1;
                else return 0;
            })
            return res.status(200).send({status: 'success', caloriesByDay})
        } catch(err) {
            return res.status(400).send({status: 'error' ,err})
        }
    },
    weeklyFoodCount: async (req: Request, res: Response): Promise<Response> => {
        const dateBeforeSevenDays: Date = getDateBeforeSevenDays();
        const dateBeforeTwoWeeks: Date = getDateBeforeTwoWeeks();
        const allDatesBeforeSevenDays: number = await FoodEntry.find({date: {$gte: dateBeforeSevenDays}}).countDocuments()
        const allDatesBeforeTwoWeeks: number = await FoodEntry.find({date: {$gte: dateBeforeTwoWeeks, $lte: dateBeforeSevenDays}}).countDocuments()
        return res.status(200).send({status: 'success', allDatesBeforeSevenDays, allDatesBeforeTwoWeeks})
    },
    averageCalories: async (req: Request, res: Response): Promise<Response> => {
        try {
            const averageCaloriesInLastSevenDays = await FoodEntry.aggregate(averageCaloriesInLastSevenDaysPipeline())
            const mappedAverageCalories = averageCaloriesInLastSevenDays.map((item: any) => ({email: item._id[0].email, id: item._id[0]._id, avgCalories: item.avgCalories}))
            return res.status(200).send({status: 'succes', averageCaloriesInLastSevenDays: mappedAverageCalories})
        } catch(err) {
            return res.status(500).send({status: 'error'})
        }
    }
}

function averageCaloriesInLastSevenDaysPipeline() {
    const dateBeforeSevenDays = getDateBeforeSevenDays();
    return [
        {
            $match: {
                "date": {$gte: dateBeforeSevenDays}
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'users'
            }
        },
        {
            $group: {
                _id: '$users',
                avgCalories: {$avg: "$calories"}
            },
        }
    ]
}