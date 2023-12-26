import mongoose, {Schema} from "mongoose";
import type {IFood} from "../interfaces/Food"

const FoodEntry = new Schema<IFood>({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    price: {type: Number, required: true, min: 1},
    calories: {type: Number, required: true, min: 1},
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model<IFood>('Food', FoodEntry)