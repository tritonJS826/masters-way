import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statistics.Selectors";
import statisticsData from "cypress/fixtures/statisticsFixture.json"
import {LanguageService} from "src/service/LanguageService";

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
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast5().click();
        allWaysSelectors.allWaysCard.getCardLink(statisticsData.johnDoeWay.title).click();

        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.total.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.total.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastWeek.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastWeek.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.total.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.total.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.total.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastMonth.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastMonth.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastMonth.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastMonth.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastMonth.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastMonth.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastWeek.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.johnDoeWay.lastWeek.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.johnDoeWay.lastWeek.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    });

});