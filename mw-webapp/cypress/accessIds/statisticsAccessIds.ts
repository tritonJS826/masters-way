export const statisticsAccessIds = {
    showAllStatisticsButton: 'showAllStatisticsButton',
    daysFromStart: 'daysFromStart',

    statistics: {
        modal: 'statisticsModal',
        wayPageStatistics: 'wayPageStatistics',

        periodBlocks: {
            periodBlock: (period: string) => `${period}_statisticPeriod`,

            overallInfo: {
                statisticValue: 'statisticValue',
                statisticText: 'statisticText',
                totalTime: (period: string) => `totalTime${period}`,
                totalReports: (period: string) => `totalReports${period}`,
                finishedJobs: (period: string) => `finishedJobs${period}`,
                avgTimePerCalendarDay: (period: string) => `averageTimePerCalendarDay${period}`,
                avgTimePerWorkingDay: (period: string) => `averageTimePerWorkingDay${period}`,
                avgJobTime: (period: string) => `averageJobTime${period}`,
            },

            labelsStatistic: {
                tagColor: 'tagColor',
                labelName: 'labelName',
                jobsAmount: 'jobsAmount',
                time: 'time',
            }
        },

        closeButton: 'closeButton'
    }
};