export interface CaloriesByDayI {
    caloriesByDay: CaloriesAndDateEntryI[],
    status: string
}

interface CaloriesAndDateEntryI {
    date: string,
    totalAmount: number,
}