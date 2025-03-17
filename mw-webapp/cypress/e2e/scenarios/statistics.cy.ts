import {statisticsAccessIds, ModalPeriodBlockTitles, WayPagePeriodBlockTitles} from "cypress/accessIds/statisticsAccessIds";
import {statisticsSelectors} from "cypress/scopesSelectors/statisticsSelectors";
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {statisticsData, studentStatsData} from "cypress/testData/statisticTestData";
import {MinDayReports, AllWaysPage} from "cypress/support/pages/AllWaysPage";
import {WayPage} from "cypress/support/pages/WayPage";

type StatisticsPlacement = keyof typeof statisticsData.statisticsPlacement;
type PeriodBlockTitle = WayPagePeriodBlockTitles | ModalPeriodBlockTitles;

type OverallInfo = {
    totalTime: number,
    totalReports: number,
    finishedJobs: number,
    avgTimePerCalendarDay: number,
    avgTimePerWorkingDay: number,
    avgJobTime: number
};

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

    checkStatisticValue(overallInfo.getTotalTime(periodBlockTitle), `${expectedOverallInformation.totalTime.toFixed(1)}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getTotalReports(periodBlockTitle), `${expectedOverallInformation.totalReports}`);
    checkStatisticValue(overallInfo.getFinishedJobs(periodBlockTitle), `${expectedOverallInformation.finishedJobs}`);
    checkStatisticValue(overallInfo.getAvgTimePerCalendarDay(periodBlockTitle), `${expectedOverallInformation.avgTimePerCalendarDay.toFixed(1)}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAverageTimePerWorkingDay(periodBlockTitle), `${expectedOverallInformation.avgTimePerWorkingDay.toFixed(1)}${unitOfMeasurement}`);
    checkStatisticValue(overallInfo.getAvgJobTime(periodBlockTitle), `${expectedOverallInformation.avgJobTime.toFixed(1)}${unitOfMeasurement}`);
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
    expectedLabelRowData: { label: { name: string, color: string }, jobsAmount: string, time: string }
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
            const matchedLabelByName = Cypress._.find(labelNames, (el) => Cypress.$(el).text() === expectedLabelRowData.label.name);

            if (matchedLabelByName) {
                // Find the entire row containing the matched label
                const matchedLabelRow = Cypress.$(matchedLabelByName).closest(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`);

                // Check the label text, amount and time
                const checkLabelParameter = (selector: string, assertion: string, value: string) => {
                    cy.wrap(matchedLabelRow).find(`[data-cy="${selector}"]`).should(assertion, value);
                };

                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName, 'have.text', expectedLabelRowData.label.name);
                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount, 'have.text', expectedLabelRowData.jobsAmount);
                checkLabelParameter(statisticsAccessIds.statistics.periodBlocks.labelStatistic.time, 'have.text', expectedLabelRowData.time);

                // Check the color
                cy.wrap(matchedLabelRow)
                    .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('contains', expectedLabelRowData.label.color);
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
        cy.openAllWaysPage();
        AllWaysPage.openWayByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: MinDayReports.atLeast5Reports});
 
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

    it('Scenario_Mentor_CompositeWayStatistics', () => {
        // Create a user-mentor with a composite way that includes one child way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        cy.openAllWaysPage();
        AllWaysPage
            .openWayByClickingCard(statisticsData.testWays.johnDoeWay.title, {minDayReports: MinDayReports.atLeast5Reports})
            .addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);
        cy.logout();

        // Create user-student with a way that includes one day report
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();
        dayReportsSelectors.getCreateNewDayReportButton().click();
        WayPage.addDayReportToWay({reportIndex: 0, jobDoneDescription: dayReportsData.jobDoneDescription, timeSpentOnJob: dayReportsData.timeSpentOnJob});
        adjustLabelForWay(studentStatsData.labels.studentLabel.name);
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        headerSelectors.getHeader().click();
        cy.logout();

        cy.openAllWaysPage();
        // Open the mentor composite way
        AllWaysPage.openWayByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: MinDayReports.any});

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
        cy.openAllWaysPage();
        AllWaysPage
            .openWayByClickingCard(testUserData.testUsers.studentJonh.wayTitle, {minDayReports: MinDayReports.any})
            .addThisWayToCompositeWay(testUserData.testUsers.mentorMax.wayTitle);

        cy.openAllWaysPage();
        AllWaysPage.openWayByClickingCard(testUserData.testUsers.mentorMax.wayTitle, {minDayReports: MinDayReports.any});

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