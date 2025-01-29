import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const statisticsSelectors = {
    getShowAllStatisticsButton: () => cy.get(getDataCy(statisticsAccessIds.showAllStatisticsButton)),
    getDaysFromStart: () => cy.get(getDataCy(statisticsAccessIds.daysFromStart)),

    statistics: {
        getModal: () => cy.get(getDataCy(statisticsAccessIds.statistics.modal)),
        getWayPageStatistics: () => cy.get(getDataCy(statisticsAccessIds.statistics.wayPageStatistics)),

        periodBlocks: {
            periodBlock: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.periodBlock(period))),

            overallInfo: {
                getStatisticValue: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue)),
                getStatisticText: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticText)),
                getTotalTime: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.totalTime(period))),
                getTotalReports: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.totalReports(period))),
                getFinishedJobs: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.finishedJobs(period))),
                getAvgTimePerCalendarDay: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerCalendarDay(period))),
                getAverageTimePerWorkingDay: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerWorkingDay(period))),
                getAvgJobTime: (period: string) => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.overallInfo.avgJobTime(period))),
            },

            labelsStatistic: {
                getTagColor: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor)),
                getLabelName: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName)),
                getJobsAmount: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount)),
                getTime: () => cy.get(getDataCy(statisticsAccessIds.statistics.periodBlocks.labelStatistic.time)),
            }
        },

        getCloseButton: () => cy.get(getDataCy(statisticsAccessIds.statistics.closeButton))
    }
};