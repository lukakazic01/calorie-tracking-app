import mongoose, {Schema} from 'mongoose';
import type {UserI} from "../interfaces/User";

const userSchema = new Schema<UserI>({
    email: {required: true, type: String},
    password: {required: true, type: String}
})

module.exports = mongoose.model<UserI>('User', userSchema);
