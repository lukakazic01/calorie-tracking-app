import type {UserI} from "@/server/interfaces/User";
import {Types} from 'mongoose'
export interface IFood {
    _id?: Types.ObjectId,
    date: Date,
    name: string,
    price: number,
    calories: number;
    user: UserI
}