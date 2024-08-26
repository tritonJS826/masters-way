import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const dayReportsSelectors = {
    dayReportsContent: {
        getReportDate: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.reportDate)),

        jobDone: {
            getReporterName: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.reporterName)),
            getJobDoneDescription: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.jobDoneDescription)),
            getTimeSpentOnJob: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.timeSpentOnJob)),
        }
    }

};