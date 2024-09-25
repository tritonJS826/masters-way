import {wayMetricsAccessIds} from "cypress/accessIds/wayMetricsAccessIds";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

export const wayMetricsSelectors = {

    metricButtons: {
        getAddNewGoalMetricButton: () => cy.get(getDataCy(wayMetricsAccessIds.metricButtons.addNewGoalMetricButton)),
        getGenerateNewMetricsAIButton: () => cy.get(getDataCy(wayMetricsAccessIds.metricButtons.generateNewMetricsAiButton)),
    },

    metricsAiGeneratedDialog: {
        getDialogWindow: () => cy.get(getDataCy(wayMetricsAccessIds.metricsAiGeneratedDialog.dialogWindow)),
        getMetricCheckbox: () => cy.get(getDataCy(wayMetricsAccessIds.metricsAiGeneratedDialog.metricCheckbox)),
        getGeneratedMetric: () => cy.get(getDataCy(wayMetricsAccessIds.metricsAiGeneratedDialog.generatedMetric)),
        getAddSelectedMetricsButton: () => cy.get(getDataCy(wayMetricsAccessIds.metricsAiGeneratedDialog.addSelectedMetricsButton)),
    },

    getMetricDescription: () => cy.get(getDataCy(wayMetricsAccessIds.metricDescription)),
    getMetricDescriptionInput: () => cy.get(getDataCy(wayMetricsAccessIds.metricDescriptionInput)),

    deleteMetric:{
        getTrashButton: () => cy.get(getDataCy(wayMetricsAccessIds.deleteMetric.trashButton)),
        getCancelButton: () => cy.get(getDataCy(wayMetricsAccessIds.deleteMetric.cancelButton)),
        getDeleteButton: () => cy.get(getDataCy(wayMetricsAccessIds.deleteMetric.deleteButton)),
    }
};