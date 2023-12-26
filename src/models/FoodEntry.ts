import {Types} from 'mongoose'

export interface IFoodEntry {
    _id?: Types.ObjectId
    name: string,
    calories: number | null,
    price: number | null,
    date: Date,
}