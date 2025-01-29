import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statistics.Selectors";
import statisticsData from "cypress/fixtures/statisticsFixture.json"
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";
import testUserData from "cypress/fixtures/testUserDataFixture.json";
import {userWaysSelectors} from "cypress/scopesSelectors/userWaysSelectors";
import {wayDescriptionSelectors} from "cypress/scopesSelectors/wayDescriptionSelectors";
import {userPersonalSelectors} from "cypress/scopesSelectors/userPersonalDataSelectors";
import dayReportsData from "cypress/fixtures/dayReportsFixture.json";
import {headerSelectors} from "cypress/scopesSelectors/headerSelectors";

const TEST_WAY = "johnDoeWay", COMPOSITE_TEST_WAY = "mentorCompositeWay";
const TOTAL_PERIOD = "total", LAST_MONTH_PERIOD = "lastMonth", LAST_WEEK_PERIOD = "lastWeek";
const WAY_PAGE_CONTEXT = "page", MODAL_WINDOW_CONTEXT = "modal";

type PeriodBlockWayPageTitle = typeof TOTAL_PERIOD | typeof LAST_WEEK_PERIOD;
type PeriodBlockStatisticModalTitle = typeof TOTAL_PERIOD | typeof LAST_MONTH_PERIOD | typeof LAST_WEEK_PERIOD;
type PeriodBlockTitle = PeriodBlockWayPageTitle | PeriodBlockStatisticModalTitle;
type Way = typeof TEST_WAY | typeof COMPOSITE_TEST_WAY;
type Context = typeof WAY_PAGE_CONTEXT | typeof MODAL_WINDOW_CONTEXT;

function openWayFromCard(wayTitle: string, filterOption: 'getDayReportsSelectOption0' | 'getDayReportsSelectOptionAtLeast5'): void {
    cy.openAllWaysPage();
    allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
    allWaysSelectors.filterViewBlock[filterOption]().click();
    allWaysSelectors.allWaysCard.getCardLink(wayTitle).click();  
};

function checkOverallInfo(context: Context, periodTitle: PeriodBlockTitle, way: Way): void {
    // Get the statistic period block title depending on the context
    const periodBlockTitle =
        context === WAY_PAGE_CONTEXT
            ? (statisticsData.periodBlockWayPageTitles as Record<PeriodBlockWayPageTitle, string>)[periodTitle as PeriodBlockWayPageTitle]
            : (statisticsData.periodBlockModalTitles as Record<PeriodBlockStatisticModalTitle, string>)[periodTitle as PeriodBlockStatisticModalTitle];

    // Get data for the given way and periodTitle
    const wayData = statisticsData[way][periodTitle as keyof typeof statisticsData[typeof way]];

    if (
        !wayData ||
        typeof wayData !== "object" ||
        !("totalTime" in wayData) ||
        !("totalReports" in wayData) ||
        !("finishedJobs" in wayData) ||
        !("avgTimePerCalendarDay" in wayData) ||
        !("avgTimePerWorkingDay" in wayData) ||
        !("avgJobTime" in wayData)
    ) {
        throw new Error(
            `Invalid data for way="${way}", periodTitle="${periodTitle}". Expected an object with required statistics.`
        );
    }

    // Check "Overall Information" values for the given time period and the context
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getTotalTime(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', `${wayData.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getTotalReports(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', wayData.totalReports);
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getFinishedJobs(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', wayData.finishedJobs);
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getAvgTimePerCalendarDay(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', `${wayData.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getAverageTimePerWorkingDay(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', `${wayData.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    statisticsSelectors.statistics.periodBlocks.overallInfo
        .getAvgJobTime(periodBlockTitle)
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        .should('have.text', `${wayData.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
}

function checkNumberOfLabelLines(context: Context, periodTitle: PeriodBlockTitle, way: Way): void {
    // Determine the block title depending on the context
    const periodBlockTitle =
        context === WAY_PAGE_CONTEXT
            ? (statisticsData.periodBlockWayPageTitles as Record<PeriodBlockWayPageTitle, string>)[periodTitle as PeriodBlockWayPageTitle]
            : (statisticsData.periodBlockModalTitles as Record<PeriodBlockStatisticModalTitle, string>)[periodTitle as PeriodBlockStatisticModalTitle];
    
    // Determine label statistic lines
    const labelLinesLength = statisticsData[way].labelStatistic[periodTitle].length;

    // Check label lines amount for the given context
    if (context === WAY_PAGE_CONTEXT) {
        statisticsSelectors.statistics.periodBlocks.periodBlock(periodBlockTitle)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
            .should('have.length', labelLinesLength);
    } else if (context === MODAL_WINDOW_CONTEXT) {
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodTitle].en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.line}"]`)
            .should('have.length', labelLinesLength);
    }
};

function checkLabelLineData(context: Context, periodTitle: PeriodBlockTitle, way: Way, lineIndex: number): void {
    // Get statistics for the way in the given period 
    const labelStatistic = statisticsData[way]?.labelStatistic[periodTitle];

    // Get label statistic line
    const lineKey = `line${lineIndex + 1}` as keyof typeof labelStatistic;
    const labelLine = labelStatistic[lineKey];

    if (
        typeof labelLine !== "object" ||
        !("color" in labelLine) ||
        !("name" in labelLine) ||
        !("jobsAmount" in labelLine) ||
        !("time" in labelLine)
    ) {
        throw new Error(
            `Invalid label line data for way="${way}", periodTitle="${periodTitle}", lineKey="${lineKey}". Expected an object with properties color, name, jobsAmount, and time.`
        );
    }

    // Get statistic period block title the for given context
    const periodBlockTitle =
        context === WAY_PAGE_CONTEXT
            ? (statisticsData.periodBlockWayPageTitles as Record<PeriodBlockWayPageTitle, string>)[periodTitle as PeriodBlockWayPageTitle]
            : (statisticsData.periodBlockModalTitles as Record<PeriodBlockStatisticModalTitle, string>)[periodTitle as PeriodBlockStatisticModalTitle];

    // Get a selector depending on the context
    if (context === WAY_PAGE_CONTEXT) {
        cy.get(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(periodBlockTitle)}"]`)
            .as('currentSelector');
    } else {
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock[periodTitle].en)}"]`)
            .as('currentSelector');
    }

    // Check tagColor, labelName, jobsAmount and time values
    cy.get('@currentSelector')
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
        .eq(lineIndex)
        .should('have.attr', 'style')
        .and('include', labelLine.color);

    cy.get('@currentSelector')
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
        .eq(lineIndex)
        .should('have.text', labelLine.name);

    cy.get('@currentSelector')
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
        .eq(lineIndex)
        .should('have.text', labelLine.jobsAmount);

    cy.get('@currentSelector')
        .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
        .eq(lineIndex)
        .should('have.text', labelLine.time);
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
        openWayFromCard(statisticsData.johnDoeWay.title, 'getDayReportsSelectOptionAtLeast5');

        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        checkOverallInfo(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        checkOverallInfo(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 0);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 1);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 2);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 0);
        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 1);
        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 2);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        checkOverallInfo(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 2);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 2);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 2);

        statisticsSelectors.statistics.getCloseButton().click({force:true});

        statisticsSelectors.statistics.getModal().should('not.exist');

        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.johnDoeWay.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.johnDoeWay.total.totalReports})`);
    });

    it('Scenario_Mentor_CompositeWayStatistics', () => {
        // Create a user-mentor with a composite way that includes one child way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        userPersonalSelectors.surveyModal.userInfoSurvey.getOverlay().click({force: true});
        userWaysSelectors.getCreateNewWayButton().click();
        cy.openAllWaysPage();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast5().click();
        allWaysSelectors.allWaysCard.getCardLink(statisticsData.johnDoeWay.title).click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite ways`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();
        cy.logout();

        // Create user-student with a way that includes one day report
        cy.login(testUserData.testUsers.studentJonh.loginLink);
        userWaysSelectors.getCreateNewWayButton().click();
        dayReportsSelectors.labels.getAdjustLabelsButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.getAddLabelButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getInput().click().type(dayReportsData.labels.student);
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getOkButton().click();
        dayReportsSelectors.labels.adjustLabelsDialog.addLabelDialog.getCancelButton().click();
        dayReportsSelectors.getCreateNewDayReportButton().click();
        dayReportsSelectors.dayReportsContent.getAddButton().first().click();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescriptionInput().type(dayReportsData.jobDoneDescription);
        headerSelectors.getHeader().click();
        dayReportsSelectors.labels.addLabel.getAddLabelLine('jobDone').click();
        dayReportsSelectors.labels.addLabel.getLabelToChoose().click();
        dayReportsSelectors.labels.addLabel.getSaveButton().click();
        headerSelectors.getHeader().click();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJob().dblclick();
        dayReportsSelectors.dayReportsContent.jobDone.getTimeSpentOnJobInput().type(dayReportsData.timeSpentOnJob);
        headerSelectors.getHeader().click();
        cy.logout();

        // Open the mentor composite way
        openWayFromCard(testUserData.testUsers.mentorMax.wayTitle, 'getDayReportsSelectOption0');

        checkOverallInfo(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        checkOverallInfo(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 0);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 1);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 2);
        checkLabelLineData(WAY_PAGE_CONTEXT, TOTAL_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 0);
        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 1);
        checkLabelLineData(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 2);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        checkOverallInfo(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 2);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 2);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, TEST_WAY, 3);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY);

        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 0);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 1);
        checkLabelLineData(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, TEST_WAY, 2);

        statisticsSelectors.statistics.getCloseButton().click();

        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.johnDoeWay.total.totalReports}`);
            
        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click({force: true});

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.johnDoeWay.total.totalReports})`);

        // Mentor adds the student way to the compisite way
        cy.login(testUserData.testUsers.mentorMax.loginLink);
        cy.openAllWaysPage();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.studentJonh.wayTitle).first().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionButton().click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubTriggerItem()
            .contains(`Composite ways`)
            .click();
        wayDescriptionSelectors.wayActionMenu.getWayActionSubMenuItem()
            .contains(`Add to composite way ${testUserData.testUsers.mentorMax.wayTitle}`)
            .click();

        // Open the mentor composite way
        openWayFromCard(testUserData.testUsers.mentorMax.wayTitle, 'getDayReportsSelectOption0');
        // headerSelectors.getAvatar().click();
        // allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).click();

        checkOverallInfo(WAY_PAGE_CONTEXT, TOTAL_PERIOD, COMPOSITE_TEST_WAY);
        checkOverallInfo(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, COMPOSITE_TEST_WAY);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, TOTAL_PERIOD, COMPOSITE_TEST_WAY);

        checkNumberOfLabelLines(WAY_PAGE_CONTEXT, LAST_WEEK_PERIOD, COMPOSITE_TEST_WAY);


    //     // Check the first label data in the "Labels Statistic" section for the "Total" block on the way page
    //     statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
    //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    //         .then((elements) => {
    //             const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

    //             // Find the target element by its name
    //             const targetElement = Cypress._.find(elements, (element) => {
    //                 const elementText = Cypress.$(element).text();
    //                 return elementText === targetName;
    //             });

    //             // Verify that the target element was found
    //             if (!targetElement) {
    //                 throw new Error(`Element with name "${targetName}" not found`);
    //             }

    //             // Get the parent element of the target element
    //             const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

    //             // Check the other parameters based on the parent element
    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
    //                 .should('have.attr', 'style')
    //                 .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    //                 .should('have.text', targetName);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
    //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
    //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
    //         });
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        checkOverallInfo(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, COMPOSITE_TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, COMPOSITE_TEST_WAY);
        checkOverallInfo(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, COMPOSITE_TEST_WAY);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, TOTAL_PERIOD, COMPOSITE_TEST_WAY);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_MONTH_PERIOD, COMPOSITE_TEST_WAY);

        checkNumberOfLabelLines(MODAL_WINDOW_CONTEXT, LAST_WEEK_PERIOD, COMPOSITE_TEST_WAY);

    //     // Check the first label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
    //     statisticsSelectors.statistics.getModal()
    //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
    //         .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    //         .then((elements) => {
    //             const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

    //             // Find the target element by its name
    //             const targetElement = Cypress._.find(elements, (element) => {
    //                 const elementText = Cypress.$(element).text();
    //                 return elementText === targetName;
    //             });

    //             // Verify that the target element was found
    //             if (!targetElement) {
    //                 throw new Error(`Element with name "${targetName}" not found`);
    //             }

    //             // Get the parent element of the target element
    //             const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

    //             // Check the other parameters based on the parent element
    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.tagColor}"]`)
    //                 .should('have.attr', 'style')
    //                 .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.labelName}"]`)
    //                 .should('have.text', targetName);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.jobsAmount}"]`)
    //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

    //             cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelStatistic.time}"]`)
    //                 .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
    //         });
        
        statisticsSelectors.statistics.getCloseButton().click();
    
        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.mentorCompositeWay.total.totalReports}`);
    
        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();
    
        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.mentorCompositeWay.total.totalReports})`);
    });

});