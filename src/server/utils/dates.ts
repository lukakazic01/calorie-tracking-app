module.exports = {
    getDateBeforeSevenDays(): Date {
        const date = new Date()
        const lastWeekDate = new Date(date.setDate(date.getDate() - 6))
        return new Date(lastWeekDate.setHours(0 ,0 ,0))
    },
    getDateBeforeTwoWeeks (): Date {
        const date = new Date()
        const lastTwoWeeksDate = new Date(date.setDate(date.getDate() - 13))
        return new Date(lastTwoWeeksDate.setHours(0 ,0 ,0))
    }
}