import type {Request, Response} from "express";
import type {HydratedDocument} from "mongoose";
import type {UserI} from "../interfaces/User";
import type {IFood} from "../interfaces/Food";
const User = require('../models/user')
const FoodEntry = require('../models/food');
module.exports = {
    getFood: async (req: Request, res: Response): Promise<Response> => {
        const {email} = req.query
        try {
            const user: HydratedDocument<UserI | null>  = await User.findOne({email})
            const allFoodEntries: IFood[] | null = await FoodEntry.find({user: user._id}).select('-user').lean()
            return res.status(200).send({status: 'success', allFoodEntries})
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
            console.log(foodEntry)
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
            return res.status(409).send({status: 'success'})
        }
    },
    updateFoodEntry: async (req: Request, res: Response): Promise<Response> => {
        const {email, name, date, price, calories, _id} = req.body;
        try {
            const foodEntry: HydratedDocument<IFood | null> = await FoodEntry.findOneAndUpdate({_id}, {name, date: new Date(date), price, calories}, {new: true})
            await foodEntry.save()
            return res.status(201).send({status: 'success', foodEntry})
        } catch(err) {
            return res.status(409).send({status: 'error'})
        }
    }
}