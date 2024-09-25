import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const dayReportsSelectors = {
    getCreateNewDayReportButton: () => cy.get(getDataCy(dayReportsAccessIds.createNewDayReportButton)),

    dayReportsContent: {
        getReportDate: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.reportDate)),
        getAddButton: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.addButton)),

        jobDone: {
            getReporterName: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.reporterName)),
            getJobDoneDescription: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.jobDoneDescription)),
            getJobDoneDescriptionInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.jobDoneDescriptionInput)),
            getTimeSpentOnJob: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.timeSpentOnJob)),
            getTimeSpentOnJobInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.jobDone.timeSpentOnJobInput)),
        },

        plans: {
            getPlanDescription: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.plans.planDescription)),
            getPlanDescriptionInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.plans.planDescriptionInput)),
            getEstimatedPlanTime: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.plans.estimatedPlanTime)),
            getEstimatedPlanTimeInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.plans.estimatedPlanTimeInput)),
        },

        problems: {
            getProblemDescription: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.problems.problemDescription)),
            getProblemDescriptionInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.problems.problemDescriptionInput)),
        },

        comments: {
            getCommentDescription: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.comments.commentDescription)),
            getCommentDescriptionInput: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.comments.commentDescriptionInput)),
        }
    }
};