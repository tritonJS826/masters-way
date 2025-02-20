import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
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
import {statisticsData} from "cypress/testData/statisticTestData";
import {Periods} from "cypress/testData/statisticTestData";

type MinDayReports = "0" | "5" | "20" | "50";
type WayStatus = keyof typeof LanguageService.allWays.filterBlock.typeOptions;

type StatisticsPlacement = keyof typeof statisticsData.statisticsPlacement;
type PagePeriodBlockTitle = keyof typeof statisticsData.periodBlockTitles.wayPage;
type ModalPeriodBlockTitle = keyof typeof statisticsData.periodBlockTitles.modal;
type PeriodBlockTitle = ModalPeriodBlockTitle | PagePeriodBlockTitle;

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

function getPeriodBlockTitleForPlacement(statisticsPlacement: StatisticsPlacement, periodBlockTitle: PeriodBlockTitle): string {
    return statisticsPlacement === statisticsData.statisticsPlacement.wayPage
        ? statisticsData.periodBlockTitles.wayPage[periodBlockTitle]
        : statisticsData.periodBlockTitles.modal[periodBlockTitle];
}

function adjustWayFilterMinDayReports(minDayReports: MinDayReports) {
    const reportOptions = {
        0: LanguageService.allWays.filterBlock.minDayReportsAmountOption0.en,
        5: LanguageService.allWays.filterBlock.minDayReportsAmountOption1.en,
        20: LanguageService.allWays.filterBlock.minDayReportsAmountOption2.en,
        50: LanguageService.allWays.filterBlock.minDayReportsAmountOption3.en
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
    statisticsPlacement,
    periodBlockTitle,
    expectedOverallInformation,
}: {
    statisticsPlacement: StatisticsPlacement,
    periodBlockTitle: PeriodBlockTitle,
    expectedOverallInformation: OverallInfo
    }
) {
    const periodBlockTitleForStatisticsForPlacement = getPeriodBlockTitleForPlacement(statisticsPlacement, periodBlockTitle);

    const checkStatisticValue = (selector: any, value: string) =>
        selector.find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', value);
 
    const overallInfo = statisticsSelectors.statistics.periodBlocks.overallInfo;
    const unitOfMeasurement = LanguageService.way.statisticsBlock.unitOfMeasurement.en;

    checkStatisticValue(overallInfo.getTotalTime(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.totalTime}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getTotalReports(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.totalReports}`);
    checkStatisticValue(overallInfo.getFinishedJobs(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.finishedJobs}`);
    checkStatisticValue(overallInfo.getAvgTimePerCalendarDay(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.avgTimePerCalendarDay}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAverageTimePerWorkingDay(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.avgTimePerWorkingDay}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAvgJobTime(periodBlockTitleForStatisticsForPlacement), `${expectedOverallInformation.avgJobTime}${unitOfMeasurement}`);
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
        statisticsSelectors.statistics.periodBlocks.periodBlock(
            statisticsData.periodBlockTitles.wayPage[periodBlockTitle])
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
            .should('have.length', expectedLabelLinesCount);
    } else {     
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks
                .periodBlock(LanguageService.way.statisticsBlock[
                    periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.modal].en)}"]`)
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
    // Get the correct key for the period block title based on placement
    const periodBlockTitleForStatisticsForPlacement = getPeriodBlockTitleForPlacement(statisticsPlacement, periodBlockTitle);

    // Select the correct statistics label block based on the placement
    const labelStatisticsSector = statisticsPlacement === statisticsData.statisticsPlacement.wayPage
        ? cy.get(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(periodBlockTitleForStatisticsForPlacement)}"]`)
        : statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.modal].en)}"]`);

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
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: "5"});
 
        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.testWays.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
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
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });
            
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
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
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        statisticsSelectors.statistics.getCloseButton().click();

        statisticsSelectors.statistics.getModal().should('not.exist');

        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.johnDoeWay.statistic.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.johnDoeWay.statistic.total.totalReports})`);
    });

    it('Scenario_Mentor_CompositeWayStatistics', () => {
        // Create a user-mentor with a composite way that includes one child way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: "5"});
        addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);
        cy.logout();

        // Create user-student with a way that includes one day report
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();
        addDayReportToWay({jobDoneDescription: dayReportsData.jobDoneDescription, timeSpentOnJob: dayReportsData.timeSpentOnJob});
        adjustLabelForWay(dayReportsData.labels.student);
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        headerSelectors.getHeader().click();
        cy.logout();

        // Open the mentor composite way
        openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: "0"});

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
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
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });
            
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.johnDoeWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.johnDoeWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.johnDoeWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
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
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        statisticsSelectors.statistics.getCloseButton().click();

        statisticsSelectors.statistics.getModal().should('not.exist');

        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.johnDoeWay.statistic.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click({force: true});

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.johnDoeWay.statistic.total.totalReports})`);

        // Mentor adds the student way to the compisite way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        openWayFromAllWayPageByClickingCard(testUserData.testUsers.studentJonh.wayTitle, {minDayReports: "0"});
        addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);

        openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: "0"});

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row5
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.lastWeek.row1
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeWay.statistic.total.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeWay.statistic.total.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeWay.statistic.total.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeWay.statistic.total.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeWay.statistic.total.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeWay.statistic.total.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeWay.statistic.lastMonth.avgJobTime},
        });

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedOverallInformation: {
                totalTime: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.totalTime,
                totalReports: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.totalReports,
                finishedJobs: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.finishedJobs,
                avgTimePerCalendarDay: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgTimePerCalendarDay,
                avgTimePerWorkingDay: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgTimePerWorkingDay,
                avgJobTime: statisticsData.testWays.mentorCompositeWay.statistic.lastWeek.avgJobTime},
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.mentorCompositeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal, 
            periodBlockTitle: Periods.Total,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.total.row5
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastMonth,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: Periods.LastWeek,
            expectedLabelRowData: statisticsData.testWays.mentorCompositeWay.labelStatistics.lastWeek.row1
        });

        statisticsSelectors.statistics.getCloseButton().click();
    
        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.testWays.mentorCompositeWay.statistic.total.totalReports}`);
    
        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();
    
        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.testWays.mentorCompositeWay.statistic.total.totalReports})`);
    });

});