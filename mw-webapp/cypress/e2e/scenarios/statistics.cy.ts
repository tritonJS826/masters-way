import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statistics.Selectors";
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {statisticsData} from "cypress/testData/statisticTestData";

type MinDayReports = 0 | 5 | 20 | 50;
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

function adjustWayFilterMinDayReports(minDayReports: MinDayReports) {
    const reportSelectors = {
        0: allWaysSelectors.filterViewBlock.getDayReportsSelectOption0,
        5: allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast5,
        20: allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast20,
        50: allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast50,
    };
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    reportSelectors[minDayReports]?.().click();
}

function adjustWayFilterStatus(status: WayStatus) {
    const statusSelectors = {
        all: allWaysSelectors.filterViewBlock.getStatusSelectOptionAll,
        completed: allWaysSelectors.filterViewBlock.getStatusSelectOptionCompleted,
        abandoned: allWaysSelectors.filterViewBlock.getStatusSelectOptionAbandoned,
        inProgress: allWaysSelectors.filterViewBlock.getStatusSelectOptionInProgress,
    };
    allWaysSelectors.filterViewBlock.getStatusSelect().click();
    statusSelectors[status]?.().click();
}

function searchByWayName(wayName: string) {
    allWaysSelectors.filterViewBlock.getSearchByWayNameInput().click().type(`${wayName}{enter}`);
}

function getPeriodBlockTitleForPlacement(statisticsPlacement: StatisticsPlacement, periodBlockTitle: PeriodBlockTitle): string {
    return statisticsPlacement === statisticsData.statisticsPlacement.wayPage
        ? statisticsData.periodBlockTitles.wayPage[periodBlockTitle]
        : statisticsData.periodBlockTitles.modal[periodBlockTitle];
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

                // Check the label text, amount, and time
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
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title as string, {minDayReports: 5});
 
        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.testWays.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "total",
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
            periodBlockTitle: "lastWeek",
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
            periodBlockTitle: "total",
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "lastWeek",
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });
        
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "lastWeek",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "lastWeek",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });
            
        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.wayPage,
            periodBlockTitle: "lastWeek",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row3
        });

        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        verifyStatisticsOverallInfo({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "total",
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
            periodBlockTitle: "lastMonth",
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
            periodBlockTitle: "lastWeek",
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
            periodBlockTitle: "total",
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.total).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastMonth",
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth).length
        });

        verifyNumberOfLabelStatisticsRows({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastWeek",
            expectedLabelLinesCount: Object.keys(statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek).length
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "total",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.total.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastMonth",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastMonth",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastMonth",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row3
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastMonth",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastMonth.row4
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastWeek",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row1
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastWeek",
            expectedLabelRowData: statisticsData.testWays.johnDoeWay.labelStatistics.lastWeek.row2
        });

        verifyLabelStatisticsRow({
            statisticsPlacement: statisticsData.statisticsPlacement.modal,
            periodBlockTitle: "lastWeek",
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

    // it('Scenario_Mentor_CompositeWayStatistics', () => {
    //     // Create a user-mentor with a composite way that includes one child way
    //     cy.login(testUserData.testUsers.mentorMax.loginLink);
    //     userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
    //     userWaysSelectors.getCreateNewWayButton().click();
    //     cy.openAllWaysPage();
    //     allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    //     allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast5().click();
    //     allWaysSelectors.allWaysCard.getCardLink(statisticsData.johnDoeWay.title).click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
    //         .contains(`Composite ways`)
    //         .click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
    //         .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
    //         .click();
    //     cy.logout();

    //     // Create user-student with a way that includes one day report
    //     cy.login(testUserData.testUsers.studentJonh.loginLink);
    //     userWaysSelectors.getCreateNewWayButton().click();
    //     dayReportsSelectors.labels.getAdjustLabelsButton().click();
    //     dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
    //     dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(dayReportsData.labels.student);
    //     dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
    //     dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();
    //     dayReportsSelectors.getCreateNewDayReportButton().click();
    //     dayReportsSelectors.dayReportsContent.getAddButton().first().click();
    //     dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
    //     dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
    //     dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(dayReportsData.jobDoneDescription);
    //     headerSelectors.getHeader().click();
    //     dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
    //     dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
    //     dayReportsSelectors.labels.addLabel.getSaveButton().click();
    //     headerSelectors.getHeader().click();
    //     dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
    //     dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
    //     dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(dayReportsData.timeSpentOnJob);
    //     headerSelectors.getHeader().click();
    //     cy.logout();

    //     // Open the mentor composite way
    //     openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, 'getDayReportsSelectOption0');

    //     // checkOverallInfo(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY);
    //     // checkOverallInfo(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY);

    //     // checkNumberOfLabelLines(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY);
        
    //     // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 0);
    //     // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 1);
    //     // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 2);
    //     // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 3);

    //     // checkNumberOfLabelLines(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY);

    //     // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 0);
    //     // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 1);
    //     // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 2);
            
    //     statisticsSelectors.getShowAllStatisticsButton().click();

    //     statisticsSelectors.statistics.getModal().should('be.visible');

    //     // checkOverallInfo(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY);
    //     // checkOverallInfo(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY);
    //     // checkOverallInfo(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY);

    //     // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 0);
    //     // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 1);
    //     // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 2);
    //     // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 3);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY);

    //     // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 0);
    //     // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 1);
    //     // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 2);
    //     // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 3);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY);

    //     // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 0);
    //     // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 1);
    //     // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 2);

    //     statisticsSelectors.statistics.getCloseButton().click();

    //     // Check "Total reports" and "Total" in the header of day report table on the way page
    //     dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
    //         .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.johnDoeWay.total.totalReports}`);
            
    //     dayReportsSelectors.dayReportsContent.getLoadMoreButton().click({force: true});

    //     dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
    //         .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.johnDoeWay.total.totalReports})`);

    //     // Mentor adds the student way to the compisite way
    //     cy.login(testUserData.testUsers.mentorMax.loginLink);
    //     cy.openAllWaysPage();
    //     allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    //     allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
    //     allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
    //         .contains(`Composite ways`)
    //         .click();
    //     wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
    //         .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
    //         .click();

    //     // Open the mentor composite way
    //     openWayFromAllWayPageByClickingCard(testUserData.testUsers.mentorMax.wayTitle, 'getDayReportsSelectOption0');
    //     // headerSelectors.getAvatar().click();
    //     // allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).click();

    //     // checkOverallInfo(statisticsData.windowType.wayPage, TOTAL_PERIOD, COMPOSITE_TEST_WAY);
    //     // checkOverallInfo(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, COMPOSITE_TEST_WAY);

    //     // checkNumberOfLabelLines(statisticsData.windowType.wayPage, TOTAL_PERIOD, COMPOSITE_TEST_WAY);

    //     // checkNumberOfLabelLines(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, COMPOSITE_TEST_WAY);


    // //     // Check the first label data in the "Labels Statistic" section for the "Total" block on the way page
    // //     statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
    // //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    // //         .then((elements) => {
    // //             const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

    // //             // Find the target element by its name
    // //             const targetElement = Cypress._.find(elements, (element) => {
    // //                 const elementText = Cypress.$(element).text();
    // //                 return elementText === targetName;
    // //             });

    // //             // Verify that the target element was found
    // //             if (!targetElement) {
    // //                 throw new Error(`Element with name "${targetName}" not found`);
    // //             }

    // //             // Get the parent element of the target element
    // //             const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

    // //             // Check the other parameters based on the parent element
    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
    // //                 .should('have.attr', 'style')
    // //                 .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    // //                 .should('have.text', targetName);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
    // //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
    // //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
    // //         });
            
    //     statisticsSelectors.getShowAllStatisticsButton().click();

    //     // checkOverallInfo(MODAL_WINDOW, TOTAL_PERIOD, COMPOSITE_TEST_WAY);
    //     // checkOverallInfo(MODAL_WINDOW, LAST_MONTH_PERIOD, COMPOSITE_TEST_WAY);
    //     // checkOverallInfo(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, COMPOSITE_TEST_WAY);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, TOTAL_PERIOD, COMPOSITE_TEST_WAY);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, LAST_MONTH_PERIOD, COMPOSITE_TEST_WAY);

    //     // checkNumberOfLabelLines(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, COMPOSITE_TEST_WAY);

    // //     // Check the first label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
    // //     statisticsSelectors.statistics.getModal()
    // //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
    // //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    // //         .then((elements) => {
    // //             const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

    // //             // Find the target element by its name
    // //             const targetElement = Cypress._.find(elements, (element) => {
    // //                 const elementText = Cypress.$(element).text();
    // //                 return elementText === targetName;
    // //             });

    // //             // Verify that the target element was found
    // //             if (!targetElement) {
    // //                 throw new Error(`Element with name "${targetName}" not found`);
    // //             }

    // //             // Get the parent element of the target element
    // //             const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

    // //             // Check the other parameters based on the parent element
    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
    // //                 .should('have.attr', 'style')
    // //                 .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    // //                 .should('have.text', targetName);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
    // //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

    // //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
    // //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
    // //         });
        
    //     statisticsSelectors.statistics.getCloseButton().click();
    
    //     // Check "Total reports" and "Total" in the header of day report table on the way page
    //     dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
    //         .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.mentorCompositeWay.total.totalReports}`);
    
    //     dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();
    
    //     dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
    //         .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.mentorCompositeWay.total.totalReports})`);
    // });

});