export enum ModalPeriodBlockTitles {
    Total = "total",
    LastMonth = "lastMonth",
    LastWeek = "lastWeek"
};

export enum WayPagePeriodBlockTitles {
    Total = "Total",
    LastWeek = "Last week"
};

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
                totalTime: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `totalTime_${period}`,
                totalReports: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `totalReports_${period}`,
                finishedJobs: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `finishedJobs_${period}`,
                avgTimePerCalendarDay: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `averageTimePerCalendarDay_${period}`,
                avgTimePerWorkingDay: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `averageTimePerWorkingDay_${period}`,
                avgJobTime: (period: ModalPeriodBlockTitles | WayPagePeriodBlockTitles) => `averageJobTime_${period}`,
            },

            labelStatistic: {
                line: 'statisticLine',
                tagColor: 'tagColor',
                labelName: 'labelName',
                jobsAmount: 'jobsAmount',
                time: 'time',
            }
        },

        closeButton: 'closeButton'
    }
};