import type {UserI} from "@/server/interfaces/User";

export interface IFood {
    date: Date,
    name: string,
    price: number,
    calories: number;
    user: UserI
}