import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {LanguageService} from "src/service/LanguageService";

interface WayDayReportData {
    reportIndex: number,
    jobDoneDescription?: string;
    timeSpentOnJob?: string;
    planDescription?: string;
    estimatedPlanTime?: string;
    problemDescription?: string;
    commentDescription?: string;
};

export enum JobDoneOrPlanLabelTarget {
    jobDone = "jobDone",
    plan = "plan"
};

export class WayPage {
    static addDayReportData(wayDayReportData?: WayDayReportData) {        
        if (!wayDayReportData) return this;
        if (wayDayReportData.jobDoneDescription) {
            dayReportsSelectors.dayReportsContent.getAddButton().first().click().wait(500);
            dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
            dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(wayDayReportData.jobDoneDescription);
            headerSelectors.getHeader().click();    
                if (wayDayReportData.timeSpentOnJob) {
                    dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().eq(wayDayReportData.reportIndex).dblclick();
                    dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(wayDayReportData.timeSpentOnJob);
                    headerSelectors.getHeader().click();
                }
        }
        if (wayDayReportData.planDescription) {
            dayReportsSelectors.dayReportsContent.getAddButton().eq(1).click();
            dayReportsSelectors.dayReportsContent.plans.getPlanDescription().eq(wayDayReportData.reportIndex).dblclick()
            dayReportsSelectors.dayReportsContent.plans.getPlanDescriptionInput().type(wayDayReportData.planDescription);
            headerSelectors.getHeader().click();    
                if (wayDayReportData.estimatedPlanTime) {
                    dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTime().dblclick();
                    dayReportsSelectors.dayReportsContent.plans.getEstimatedPlanTimeInput().type(wayDayReportData.estimatedPlanTime);
                    headerSelectors.getHeader().click(); 
                }
        }
        if (wayDayReportData.problemDescription) {
            dayReportsSelectors.dayReportsContent.getAddButton().eq(2).click();
            dayReportsSelectors.dayReportsContent.problems.getProblemDescription().eq(wayDayReportData.reportIndex).dblclick()
            dayReportsSelectors.dayReportsContent.problems.getProblemDescriptionInput().type(wayDayReportData.problemDescription);
            headerSelectors.getHeader().click();
        }
        if (wayDayReportData.commentDescription) {
            dayReportsSelectors.dayReportsContent.getAddButton().eq(3).click();
            dayReportsSelectors.dayReportsContent.comments.getCommentDescription().eq(wayDayReportData.reportIndex).dblclick()
            dayReportsSelectors.dayReportsContent.comments.getCommentDescriptionInput().type(wayDayReportData.commentDescription);
            headerSelectors.getHeader().click();
        }

        return this;
    }

    static addThisWayToCompositeWay(compositeWayTitle: string) {
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(LanguageService.way.wayActions.compositeWayManagement.en)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`${LanguageService.way.wayActions.addToCompositeWay.en} ${compositeWayTitle}`)
            .click();
    }

    static addWayToCollection(collectionName: string) {
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu
            .getWayActionSubTriggerItem()
            .contains(LanguageService.way.wayActions.collectionManagement.en)
            .click();
        wayDescriptionSelectors.wayActionMenu
            .getWayActionSubMenuItem()
            .contains(`${LanguageService.way.wayActions.addTo.en} ${collectionName}`)
            .click();
    }

    static deleteWayFromCollection(collectionName: string) {
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu
            .getWayActionSubTriggerItem()
            .contains(LanguageService.way.wayActions.collectionManagement.en)
            .click();
        wayDescriptionSelectors.wayActionMenu
            .getWayActionSubMenuItem()
            .contains(`${LanguageService.way.wayActions.deleteFrom.en} ${collectionName}`)
            .click();
    }

    static adjustLabel(labelName: string) {
        dayReportsSelectors.labels.getAdjustLabelsButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(labelName);
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();

        return this;
    }

    static addLabel({
        labelName,
        labelTarget,
        numberOfJobDoneOrPlan,
    }: {
        labelName: string,
        labelTarget: JobDoneOrPlanLabelTarget,
        numberOfJobDoneOrPlan: number
    }) {
        dayReportsSelectors.labels.addLabel.getAddLabelLine(labelTarget).eq(numberOfJobDoneOrPlan).click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().contains(labelName).click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        headerSelectors.getHeader().click();

        return this;
    }

    static createNewDayReport() {
        dayReportsSelectors.getCreateNewDayReportButton().click();

        return this;
    }

    static editGoal(goal: string) {
        wayDescriptionSelectors.wayDashBoardLeft.getGoal()
            .dblclick()
            .type('{selectall}')
            .type(goal);
        headerSelectors.getHeader().click();
        
        return this;
    }

    static renameWay(newName: string) {
        wayDescriptionSelectors.wayDashBoardLeft.getTitle()
            .dblclick()
            .type('{selectall}')
            .type(newName + '{enter}');

        return this;
    }
}