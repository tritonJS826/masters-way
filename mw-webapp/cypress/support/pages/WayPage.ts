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

export class WayPage {
    static addDayReportToWay(wayDayReportData?: WayDayReportData) {        
        if (!wayDayReportData) return;
        if (wayDayReportData.jobDoneDescription) {
            dayReportsSelectors.dayReportsContent.getAddButton().first().click();
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
            dayReportsSelectors.dayReportsContent.comments.getCommentDescription().dblclick()
            dayReportsSelectors.dayReportsContent.comments.getCommentDescriptionInput().type(wayDayReportData.commentDescription);
            headerSelectors.getHeader().click();
        }
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
}