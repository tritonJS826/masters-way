import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statistics.Selectors";
// import statisticsDataFixture from "cypress/fixtures/statisticsFixture.json"
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";
import {statisticsData} from "cypress/testData/statisticTestData";
import {periods} from "cypress/testData/statisticTestData";
import {wayTitleKeys} from "cypress/testData/statisticTestData";

const openWayFromAllWayPageByClickingCard = (wayTitle: string, filterOption: keyof typeof allWaysSelectors.filterViewBlock) => {
    cy.openAllWaysPage();
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock[filterOption]().click();
    allWaysSelectors.allWaysCard.getCardLink(wayTitle).click();
};

const getPeriodBlockTitleForWindow = (windowType: string, periodBlockTitle: string) =>
    windowType === statisticsData.windowType.wayPage
        ? statisticsData.periodBlockTitles.wayPage[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.wayPage]
        : statisticsData.periodBlockTitles.modal[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.modal];

const checkOverallInfo = (windowType: string, periodBlockTitle: string, way: string) => {
    // Get the period block title and statistic data for the given window type
    const currentWindowPeriodBlockTitle = getPeriodBlockTitleForWindow(windowType, periodBlockTitle);
    // Get the statistic data for the given way and period block, depending on the window type
    const currentWindowWayData = 
        windowType === statisticsData.windowType.wayPage
            ? statisticsData.testWays[way].statistic[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.wayPage] 
            : statisticsData.testWays[way].statistic[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.modal];

    // Check "Overall Information" values for the given time period and in the given window
    const checkValue = (selector: any, value: string) =>
        selector.find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', value);
 
    const overallInfo = statisticsSelectors.statistics.periodBlocks.overallInfo;

    checkValue(overallInfo.getTotalTime(currentWindowPeriodBlockTitle), `${currentWindowWayData.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    checkValue(overallInfo.getTotalReports(currentWindowPeriodBlockTitle), currentWindowWayData.totalReports);
    checkValue(overallInfo.getFinishedJobs(currentWindowPeriodBlockTitle), currentWindowWayData.finishedJobs);
    checkValue(overallInfo.getAvgTimePerCalendarDay(currentWindowPeriodBlockTitle), `${currentWindowWayData.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    checkValue(overallInfo.getAverageTimePerWorkingDay(currentWindowPeriodBlockTitle), `${currentWindowWayData.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    checkValue(overallInfo.getAvgJobTime(currentWindowPeriodBlockTitle), `${currentWindowWayData.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
};

// const checkOverallInfo = (windowType: string, periodBlockTitle: string, way: string) => {
//     // Get the period block title for the given window type
//     const currentWindowPeriodBlockTitle = getPeriodBlockTitleForWindow(windowType, periodBlockTitle);

//     // Get the statistic data for the given way and period block, depending on the window type
//     const currentWindowWayData = 
//         windowType === statisticsData.windowType.wayPage
//             ? statisticsData.testWays[way].statistic[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.wayPage] 
//             : statisticsData.testWays[way].statistic[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.modal];

//     // Check "Overall Information" values for the given time period and in the given window
//     const overallInfo = statisticsSelectors.statistics.periodBlocks.overallInfo;
//     overallInfo.getTotalTime(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', `${currentWindowWayData.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

//     overallInfo.getTotalReports(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', currentWindowWayData.totalReports);

//     overallInfo.getFinishedJobs(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', currentWindowWayData.finishedJobs);

//     overallInfo.getAvgTimePerCalendarDay(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', `${currentWindowWayData.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

//     overallInfo.getAverageTimePerWorkingDay(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', `${currentWindowWayData.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

//     overallInfo.getAvgJobTime(currentWindowPeriodBlockTitle)
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
//         .should('have.text', `${currentWindowWayData.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
// }


const checkNumberOfLabelLines = (windowType: string, periodBlockTitle: string, way: string) => {
    // Get the period block title for the given window type
    const currentWindowPeriodBlockTitle = getPeriodBlockTitleForWindow(windowType, periodBlockTitle);

    // Get the amount of label statistic lines
    const labelLinesLength = Object.keys(statisticsData.testWays[way].labelStatistics[periodBlockTitle]).length;

    // Get the period block selector depending on the window type
    const periodBlockSelector = 
        windowType === statisticsData.windowType.wayPage
            ? statisticsSelectors.statistics.periodBlocks.periodBlock(currentWindowPeriodBlockTitle)
            : statisticsSelectors.statistics.getModal()
                .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.wayPage].en)}"]`);

    // Check label line amount
    periodBlockSelector.find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
        .should('have.length', labelLinesLength);
};

// const checkNumberOfLabelLines = (windowType: string, periodBlockTitle: string, way: string) => {
//     // Get the period block title for the given window type
//     const currentWindowPeriodBlockTitle = getPeriodBlockTitleForWindow(windowType, periodBlockTitle);
 
//     // Get the amount of label statistic lines
//     const labelLinesLength = Object.keys(statisticsData.testWays[way].labelStatistics[periodBlockTitle]).length;

//     // Check label lines amount for the given window
//     if (windowType === statisticsData.windowType.wayPage) {
//         statisticsSelectors.statistics.periodBlocks.periodBlock(currentWindowPeriodBlockTitle)
//             .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
//             .should('have.length', labelLinesLength);
//     } else if (windowType === statisticsData.windowType.wayPage) {
//         statisticsSelectors.statistics.getModal()
//             .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodBlockTitle as keyof typeof statisticsData.periodBlockTitles.wayPage].en)}"]`)
//             .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
//             .should('have.length', labelLinesLength);
//     }
// };

// function checkLabelLineData(context: PageOrModalWindow, periodTitle: PeriodBlockTitle, way: Way, lineIndex: number): void {
//     // Get statistics for the way in the given period 
//     const labelStatistic = statisticsData[way]?.labelStatistic[periodTitle];

//     // Get label statistic line
//     const lineKey = `line${lineIndex + 1}` as keyof typeof labelStatistic;
//     const labelLine = labelStatistic[lineKey];

//     if (
//         typeof labelLine !== "object" ||
//         !("color" in labelLine) ||
//         !("name" in labelLine) ||
//         !("jobsAmount" in labelLine) ||
//         !("time" in labelLine)
//     ) {
//         throw new Error(
//             `Invalid label line data for way="${way}", periodTitle="${periodTitle}", lineKey="${lineKey}". Expected an object with properties color, name, jobsAmount, and time.`
//         );
//     }

//     // Get statistic period block title the for given context
//     const periodBlockTitle =
//         context === statisticsData.windowType.wayPage
//             ? (statisticsData.periodBlockWayPageTitles as Record<PeriodBlockWayPageTitle, string>)[periodTitle as PeriodBlockWayPageTitle]
//             : (statisticsData.periodBlockModalTitles as Record<PeriodBlockStatisticModalTitle, string>)[periodTitle as PeriodBlockStatisticModalTitle];

//     // Get a selector depending on the context
//     if (context === statisticsData.windowType.wayPage) {
//         cy.get(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(periodBlockTitle)}"]`)
//             .as('currentSelector');
//     } else {
//         statisticsSelectors.statistics.getModal()
//             .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodTitle].en)}"]`)
//             .as('currentSelector');
//     }

//     // Check tagColor, labelName, jobsAmount and time values
//     cy.get('@currentSelector')
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
//         .eq(lineIndex)
//         .should('have.attr', 'style')
//         .and('include', labelLine.color);

//     cy.get('@currentSelector')
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
//         .eq(lineIndex)
//         .should('have.text', labelLine.name);

//     cy.get('@currentSelector')
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
//         .eq(lineIndex)
//         .should('have.text', labelLine.jobsAmount);

//     cy.get('@currentSelector')
//         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
//         .eq(lineIndex)
//         .should('have.text', labelLine.time);
// }

beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Statistics tests', () => {

    it.only('Scenario_Student_wayStatistics', () => {
        openWayFromAllWayPageByClickingCard(statisticsData.testWays.johnDoeWay.title as string, 'getDayReportsSelectOptionAtLeast5');

        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.testWays.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        checkOverallInfo(statisticsData.windowType.wayPage, periods.total, wayTitleKeys.johnDoeWay);
        checkOverallInfo(statisticsData.windowType.wayPage, periods.lastWeek, wayTitleKeys.johnDoeWay);

        checkNumberOfLabelLines(statisticsData.windowType.wayPage, periods.total, wayTitleKeys.johnDoeWay);
        checkNumberOfLabelLines(statisticsData.windowType.wayPage, periods.lastWeek, wayTitleKeys.johnDoeWay);
        
        // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 0);
        // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 1);
        // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 2);
        // checkLabelLineData(statisticsData.windowType.wayPage, TOTAL_PERIOD, TEST_WAY, 3);

        // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 0);
        // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 1);
        // checkLabelLineData(statisticsData.windowType.wayPage, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 2);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        checkOverallInfo(statisticsData.windowType.modal, periods.total, wayTitleKeys.johnDoeWay);
        checkOverallInfo(statisticsData.windowType.modal, periods.lastMonth, wayTitleKeys.johnDoeWay);
        checkOverallInfo(statisticsData.windowType.modal, periods.lastWeek, wayTitleKeys.johnDoeWay);

        checkNumberOfLabelLines(statisticsData.windowType.modal, periods.total, wayTitleKeys.johnDoeWay);
        checkNumberOfLabelLines(statisticsData.windowType.modal, periods.lastMonth, wayTitleKeys.johnDoeWay);
        checkNumberOfLabelLines(statisticsData.windowType.modal, periods.lastWeek, wayTitleKeys.johnDoeWay);

        // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 0);
        // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 1);
        // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 2);
        // checkLabelLineData(MODAL_WINDOW, TOTAL_PERIOD, TEST_WAY, 3);

        // checkNumberOfLabelLines(statisticsData.windowType.modal, statisticsData.periodBlockModalTitles.lastWeek, statisticsData.way.johnDoeWay);

        // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 0);
        // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 1);
        // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 2);
        // checkLabelLineData(MODAL_WINDOW, LAST_MONTH_PERIOD, TEST_WAY, 3);

        // checkNumberOfLabelLines(statisticsData.windowType.modal, statisticsData.periodBlockModalTitles.lastMonth, statisticsData.way.johnDoeWay);

        // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 0);
        // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 1);
        // checkLabelLineData(MODAL_WINDOW, statisticsData.periodBlockModalTitles.lastWeek, TEST_WAY, 2);

        statisticsSelectors.statistics.getCloseButton().click({force:true});

        statisticsSelectors.statistics.getModal().should('not.exist');

        // Check "Total reports" and "Total" in the header of day report table on the way page
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