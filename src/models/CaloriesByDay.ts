export interface CaloriesByDayI {
    caloriesByDay: CaloriesAndDateEntryI[],
    status: string
}

interface CaloriesAndDateEntryI {
    date: string,
    amount: number
}