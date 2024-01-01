import type {IFoodEntry} from "@/models/FoodEntry";

export interface DateFilterResponse{
    allFoodEntries: IFoodEntry[],
    isError: boolean
}