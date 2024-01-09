export interface AverageCaloriesLastSevenDaysI {
    averageCaloriesInLastSevenDays: UserAndCalories[]
}

interface UserAndCalories{
    id: string,
    email: string,
    avgCalories: number
}