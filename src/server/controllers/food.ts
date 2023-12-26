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
            const allFoodEntries: HydratedDocument<IFood | null> = await FoodEntry.find({user: user._id}).select('-user')
            return res.status(200).send({status: 'success', allFoodEntries: allFoodEntries})
        } catch(err) {
            return res.status(400).send({status: 'error'})
        }

    },
    addFoodEntry: async (req: Request, res: Response): Promise<Response> => {
        const {email, name, date, price, calories} = req.body;
        try {
            const user = await User.findOne({email})
            const foodEntry = new FoodEntry({name, date, price, calories, user})
            await foodEntry.save()
            return res.status(201).send(foodEntry);
        } catch(err) {
            return res.status(400).send({status: 'error'})
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
    }
}