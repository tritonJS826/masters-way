import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const statisticsSelectors = {
    lastWeekOverallInformation : {
        getTotalTime: () => cy.get(getDataCy(statisticsAccessIds.lastWeekOverallInformation.totalTime)),
        getTotalReports: () => cy.get(getDataCy(statisticsAccessIds.lastWeekOverallInformation.totalReports)),
        getFinishedJobs: () => cy.get(getDataCy(statisticsAccessIds.lastWeekOverallInformation.finishedJobs)),
    }
};