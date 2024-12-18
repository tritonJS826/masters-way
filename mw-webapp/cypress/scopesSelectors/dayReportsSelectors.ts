import {dayReportsAccessIds} from "cypress/accessIds/dayReportsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const dayReportsSelectors = {
    getCreateNewDayReportButton: () => cy.get(getDataCy(dayReportsAccessIds.createNewDayReportButton)),
    
    labels: {
        getAdjustLabelsButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsButton)),
        
        adjustLabelsDialog:{
            getContent: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.content)),
            getAddLabelButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.addLabelButton)),
            
            addLabelDialog: {
                getContent: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.addLabelDialog.content)),
                getInput: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.addLabelDialog.input)),
                getOkButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.addLabelDialog.okButton)),
                getCancelButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.adjustLabelsContent.addLabelDialog.cancelButton))
            }
        },
        
        addLabel: {
            getAddLabelLine: (reportItem: string) => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.addLabelLine(reportItem))),
            getCrossCloseButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.crossCloseButton)),
            getAddLabelDialog: () => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.addLabelDialog)),
            getSaveButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.saveButton)),
            getCancelButton: () => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.cancelButton)),
            getLabelToChoose: () => cy.get(getDataCy(dayReportsAccessIds.labels.addLabel.labelToChoose)),
        }
    },
    
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
        },

        getSummaryText: () => cy.get(getDataCy(dayReportsAccessIds.dayReportsContent.summaryText))
    }
};