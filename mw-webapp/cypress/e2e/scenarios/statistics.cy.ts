import {statisticsAccessIds, ModalPeriodBlockTitles, WayPagePeriodBlockTitles} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statisticsSelectors";
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {statisticsData, studentStatsData} from "cypress/testData/statisticTestData";

type WayStatus = keyof typeof LanguageService.allWays.filterBlock.typeOptions;

type StatisticsPlacement = keyof typeof statisticsData.statisticsPlacement;
type PeriodBlockTitle = WayPagePeriodBlockTitles | ModalPeriodBlockTitles;

enum MinDayReports {
    any = "0",
    atLeast5Reports = "5",
    atLeast20Reports = "20",
    atLeast50Reports = "50"
};

type OverallInfo = {
    totalTime: string,
    totalReports: string,
    finishedJobs: string,
    avgTimePerCalendarDay: string,
    avgTimePerWorkingDay: string,
    avgJobTime: string
};

interface WayFilters {
    searchByWayName?: string;
    status?: WayStatus;
    minDayReports?: MinDayReports;
};

interface WayDayReportData {
        jobDoneDescription?: string;
        timeSpentOnJob?: string;
        planDescription?: string;
        estimatedPlanTime?: string;
        problemDescription?: string;
        commentDescription?: string;
};

function adjustWayFilterMinDayReports(minDayReports: MinDayReports) {
    const reportOptions = {
        [MinDayReports.any]: LanguageService.allWays.filterBlock.minDayReportsAmountOption0.en,
        [MinDayReports.atLeast5Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption1.en,
        [MinDayReports.atLeast20Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption2.en,
        [MinDayReports.atLeast50Reports]: LanguageService.allWays.filterBlock.minDayReportsAmountOption3.en
    };
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock.getDayReportsSelectOption(reportOptions[minDayReports]).click();
}

function adjustWayFilterStatus(status: WayStatus) {
    allWaysSelectors.filterViewBlock.getStatusSelect().click();
    allWaysSelectors.filterViewBlock.getStatusSelectOption(status).click();
}

function searchByWayName(wayName: string) {
    allWaysSelectors.filterViewBlock.getSearchByWayNameInput().click().type(`${wayName}{enter}`);
}

function openWayFromAllWayPageByClickingCard(
    wayTitle: string,
    wayFilters?: WayFilters
) {
    cy.openAllWaysPage();
    if (wayFilters) {
        wayFilters.searchByWayName && searchByWayName(wayFilters.searchByWayName);
        wayFilters.status && adjustWayFilterStatus(wayFilters.status);
        wayFilters.minDayReports && adjustWayFilterMinDayReports(wayFilters.minDayReports);
    }
    allWaysSelectors.allWaysCard.getCardLink(wayTitle).click();
}

function addThisWayToCompositeWay(compositeWayTitle: string) {
    wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
    wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
        .contains(LanguageService.way.wayActions.compositeWayManagement.en)
        .click();
    wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
        .contains(`${LanguageService.way.wayActions.addToCompositeWay.en} ${compositeWayTitle}`)
        .click();
}

function addDayReportToWay(wayDayReportData?: WayDayReportData) {        
    dayReportsSelectors.getCreateNewDayReportButton().click();
    if (!wayDayReportData) return;
    if (wayDayReportData.jobDoneDescription) {
        dayReportsSelectors.dayReportsContent.getAddButton().first().click();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(wayDayReportData.jobDoneDescription);
        headerSelectors.getHeader().click();    
            if (wayDayReportData.timeSpentOnJob) {
                dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
                dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(wayDayReportData.timeSpentOnJob);
                headerSelectors.getHeader().click();
            }
    }
    if (wayDayReportData.planDescription) {
        dayReportsSelectors.dayReportsContent.getAddButton().eq(1).click();
        dayReportsSelectors.dayReportsContent.plans.getPlanDescription().dblclick()
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
        dayReportsSelectors.dayReportsContent.problems.getProblemDescription().dblclick()
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

function adjustLabelForWay (labelName: string) {
    dayReportsSelectors.labels.getAdjustLabelsButton().click();
    dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
    dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(labelName);
    dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
    dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();
}

function verifyStatisticsOverallInfo({
    periodBlockTitle,
    expectedOverallInformation,
}: {
    periodBlockTitle: PeriodBlockTitle,
    expectedOverallInformation: OverallInfo
    }
) {
    const checkStatisticValue = (selector: any, value: string) =>
        selector.find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', value);
 
    const overallInfo = statisticsSelectors.statistics.periodBlocks.overallInfo;
    const unitOfMeasurement = LanguageService.way.statisticsBlock.unitOfMeasurement.en;

    checkStatisticValue(overallInfo.getTotalTime(periodBlockTitle), `${expectedOverallInformation.totalTime}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getTotalReports(periodBlockTitle), `${expectedOverallInformation.totalReports}`);
    checkStatisticValue(overallInfo.getFinishedJobs(periodBlockTitle), `${expectedOverallInformation.finishedJobs}`);
    checkStatisticValue(overallInfo.getAvgTimePerCalendarDay(periodBlockTitle), `${expectedOverallInformation.avgTimePerCalendarDay}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAverageTimePerWorkingDay(periodBlockTitle), `${expectedOverallInformation.avgTimePerWorkingDay}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAvgJobTime(periodBlockTitle), `${expectedOverallInformation.avgJobTime}${unitOfMeasurement}`);
}

function verifyNumberOfLabelStatisticsRows({
    statisticsPlacement,
    periodBlockTitle,
    expectedLabelLinesCount,
}: {
    statisticsPlacement: StatisticsPlacement,
    periodBlockTitle: PeriodBlockTitle,
    expectedLabelLinesCount: number
    }
) {
    if (statisticsPlacement === statisticsData.statisticsPlacement.wayPage) {
        statisticsSelectors.statistics.periodBlocks.periodBlock(periodBlockTitle)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
            .should('have.length', expectedLabelLinesCount);
    } else {
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock((
                LanguageService.way.statisticsBlock[
                    periodBlockTitle as keyof typeof LanguageService.way.statisticsBlock] as { en: string }).en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
            .should('have.length', expectedLabelLinesCount);
    }
}

function verifyLabelStatisticsRow({
    statisticsPlacement,
    periodBlockTitle,
    expectedLabelRowData: expectedLabelRowData
}: {
    statisticsPlacement: StatisticsPlacement,
    periodBlockTitle: PeriodBlockTitle,
    expectedLabelRowData: { name: string, color: string, jobsAmount: string, time: string }
    }
) {
    // Select the correct statistics label block based on the placement
    const labelStatisticsSector = statisticsPlacement === statisticsData.statisticsPlacement.wayPage
        ? cy.get(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(periodBlockTitle)}"]`)
        : statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock((
                LanguageService.way.statisticsBlock[
                    periodBlockTitle as keyof typeof LanguageService.way.statisticsBlock] as { en: string }).en)}"]`);

    labelStatisticsSector
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
        .then((labelNames) => {
            // Find the label name that matches the expected label name
            const matchedLabelByName = Cypress._.find(labelNames, (el) => Cypress.$(el).text() === expectedLabelRowData.name);

            if (matchedLabelByName) {
                // Find the entire row containing the matched label
                const matchedLabelRow = Cypress.$(matchedLabelByName).closest(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`);

                // Check the label text, amount and time
                const checkLabelParameter = (selector: string, assertion: string, value: string) => {
                    cy.wrap(matchedLabelRow).find(`[data-cy="${selector}"]`).should(assertion, value);
                };

                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName, 'have.text', expectedLabelRowData.name);
                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount, 'have.text', expectedLabelRowData.jobsAmount);
                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.time, 'have.text', expectedLabelRowData.time);

                // Check the color
                cy.wrap(matchedLabelRow)
                    .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('contains', expectedLabelRowData.color);
            }
        });
}

beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Statistics tests', () => {

    it('Scenario_Student_wayStatistics', () => {
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: MinDayReports.atLeast5Reports});
 
        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.testWays.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });
            
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.statistics.getCloseButton().click();

        statisticsSelectors.statistics.getModal().should('not.exist');

        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.johnDoeWay.statistic.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.johnDoeWay.statistic.total.totalReports})`);
    });

    it.only('Scenario_Mentor_CompositeWayStatistics', () => {
        // Create a user-mentor with a composite way that includes one child way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: MinDayReports.atLeast5Reports});
        addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);
        cy.logout();

        // Create user-student with a way that includes one day report
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();
        addDayReportToWay({jobDoneDescription: dayReportsData.jobDoneDescription, timeSpentOnJob: dayReportsData.timeSpentOnJob});
        adjustLabelForWay(studentStatsData.labelActivityNames.studentLabel);
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        headerSelectors.getHeader().click();
        cy.logout();

        // Open the mentor composite way
        openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: MinDayReports.any});

        //Bug #1851
        // statisticsSelectors.getDaysFromStart()
        //     .should('have.text', `${statisticsData.testWays.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });
            
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row4
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.statistics.getCloseButton().click();

        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.johnDoeWay.statistic.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click({force: true});

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.johnDoeWay.statistic.total.totalReports})`);

        // Mentor adds the student way to the compisite way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        openWayFromAllWayPageByClickingCard(testUserData.testUsers.studentJonh.wayTitle, {minDayReports: MinDayReports.any});
        addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);

        openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: MinDayReports.any});

        //Bug #1851
        // statisticsSelectors.getDaysFromStart()
        //     .should('have.text', `${statisticsData.testWays.mentorCompositeTwoChildWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row5
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: WayPagePeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeTwoChildWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: ModalPeriodBlockTitles.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.total.row5
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth.row2
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastMonth.row5
        });


        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: ModalPeriodBlockTitles.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeTwoChildWay.labelStatistics.lastWeek.row4
        });

        statisticsSelectors.statistics.getCloseButton().click();
    
        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalReports}`);
    
        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();
    
        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.mentorCompositeTwoChildWay.statistic.total.totalReports})`);
    });

});