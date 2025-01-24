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

beforeEach(() => {
    cy.resetGeneralDb();
    cy.visit('/');
});

afterEach(() => {
    cy.clearAllStorage();
});

describe('Statistics tests', () => {

    it('Scenario_Student_wayStatistics', () => {
        // Open the test way
        cy.openAllWaysPage();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOptionAtLeast5().click();
        allWaysSelectors.allWaysCard.getCardLink(statisticsData.johnDoeWay.title).click();

        // Check "Days from start" value on the way page
        statisticsSelectors.getDaysFromStart()
            .should('have.text', `${statisticsData.johnDoeWay.daysFromStart} ${LanguageService.way.wayInfo.daysFromStart.en}`);

        // Check "Overall information" section for the "Total" block on the way page
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
        
        // Check "Overall information" section for the "Last week" block on the way page
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

        // Check the number of labels in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

        // Check the first label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[0].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].time);

        // Check the second label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[1].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].time);

        // Check the third label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[2].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[3].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].time);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        statisticsSelectors.statistics.getModal().should('be.visible');

        // Check "Overall information" section for the "Total" block in the Statistic modal window
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

        // Check "Overall information" section for the "Last month" block in the Statistic modal window      
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

        // Check "Overall information" section for the "Last week" block in the Statistic modal window
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

        // Check the number of labels in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

        // Check the first label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].time);

        // Check the second label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].time);

        // Check the third label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[3].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastMonth[4].length);

        // Check the first label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].time);

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
        // dayReportsSelectors.dayReportsContent.jobDone.getJobDoneDescription().dblclick();
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
        cy.openAllWaysPage();
        allWaysSelectors.filterViewBlock.getDayReportsSelect().click();
        allWaysSelectors.filterViewBlock.getDayReportsSelectOption0().click();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).click();

        // Check "Overall information" section for the "Total" block on the way page
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
        
        // Check "Overall information" section for the "Last week" block on the way page
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

        // Check the number of labels in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

        // Check the first label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[0].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].time);

        // Check the second label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[1].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].time);

        // Check the third label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[2].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[3].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].time);
            
        statisticsSelectors.getShowAllStatisticsButton().click();

        // Check "Overall information" section for the "Total" block in the Statistic modal window
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

        // Check "Overall information" section for the "Last month" block in the Statistic modal window      
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

        // Check "Overall information" section for the "Last week" block in the Statistic modal window
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

        // Check the number of labels in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

        // Check the first label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[0].time);

        // Check the second label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[1].time);

        // Check the third label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.total[3].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.total[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastMonth[4].length);

        // Check the first label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[2].time);

        // Check the fourth label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(3)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(3)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastMonth[3].time);

        // Check the number of labels in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[0].time);

        // Check the second label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(1)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(1)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[1].time);

        // Check the third label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(2)
            .should('have.attr', 'style')
            .and('include', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(2)
            .should('have.text', statisticsData.johnDoeWay.labelStatistic.lastWeek[2].time);

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
        headerSelectors.getAvatar().click();
        allWaysSelectors.allWaysCard.getCardLink(testUserData.testUsers.mentorMax.wayTitle).click();

        // Check "Overall information" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.total.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.total.finishedJobs);
        // TODO: wrong test - for now returns error, because of wrong math calculations - don't replace witn 0.0. we should check logic 
        // statisticsSelectors.statistics.periodBlocks.overallInfo
        //     .getAvgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.total)
        //     .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        //     .should('have.text', `${statisticsData.mentorCompositeWay.total.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        
        // Check "Overall information" section for the "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastWeek.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastWeek.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

        // Check the number of labels in the "Labels Statistic" section for "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.mentorCompositeWay.labelStatistic.total[5].length);

        // Check the first label data in the "Labels Statistic" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
            });

        // Check the second label data in the "Labels Statistic" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[1].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[1].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[1].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[1].time);
            });

        // Check the third label data in the "Labels Statistic" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[2].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[2].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[2].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[2].time);
            });

        // Check the fourth label data in the "Labels Statistic" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[3].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[3].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[3].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[3].time);
            });

        // Check the fifth label data in the "Labels Statistic" section for the "Total" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[4].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[4].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[4].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[4].time);
            });

        // Check the number of labels in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[1].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block on the way page
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].time);
            
        statisticsSelectors.getShowAllStatisticsButton().click();
    
        // Check "Overall information" section for the "Total" block in the Statistic modal window
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.total.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.total.finishedJobs);
        // TODO: wrong test - for now returns error, because of wrong math calculations - don't replace with 0.0. we should check logic 

        // statisticsSelectors.statistics.periodBlocks.overallInfo
        //     .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.total)
        //     .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
        //     .should('have.text', `${statisticsData.mentorCompositeWay.total.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.total.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    
        // Check "Overall information" section for the "Last month" block in the Statistic modal window      
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastMonth.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastMonth.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastMonth.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastMonth.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastMonth.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.lastMonth)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastMonth.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
    
        // Check "Overall information" section for the "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalTime(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.totalTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getTotalReports(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastWeek.totalReports);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getFinishedJobs(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', statisticsData.mentorCompositeWay.lastWeek.finishedJobs);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgTimePerCalendarDay(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgTimePerCalendarDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAverageTimePerWorkingDay(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgTimePerWorkingDay}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`); 
        statisticsSelectors.statistics.periodBlocks.overallInfo
            .getAvgJobTime(statisticsData.periodBlockTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.overallInfo.statisticValue}"]`)
            .should('have.text', `${statisticsData.mentorCompositeWay.lastWeek.avgJobTime}${LanguageService.way.statisticsBlock.unitOfMeasurement.en}`);

        // Check the number of labels in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.mentorCompositeWay.labelStatistic.total[5].length);

        // Check the first label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[0].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[0].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[0].time);
            });

        // Check the second label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[1].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[1].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[1].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[1].time);
            });

        // Check the third label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[2].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[2].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[2].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[2].time);
            });

        // Check the fourth label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[3].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[3].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[3].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[3].time);
            });

        // Check the fifth label data in the "Labels Statistic" section for "Total" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .then((elements) => {
                const targetName = statisticsData.mentorCompositeWay.labelStatistic.total[4].name;

                // Find the target element by its name
                const targetElement = Cypress._.find(elements, (element) => {
                    const elementText = Cypress.$(element).text();
                    return elementText === targetName;
                });

                // Verify that the target element was found
                if (!targetElement) {
                    throw new Error(`Element with name "${targetName}" not found`);
                }

                // Get the parent element of the target element
                const parentElement = Cypress.$(targetElement).closest('[data-cy^="statisticLine"]');

                // Check the other parameters based on the parent element
                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
                    .should('have.attr', 'style')
                    .and('include', statisticsData.mentorCompositeWay.labelStatistic.total[4].color);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
                    .should('have.text', targetName);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[4].jobsAmount);

                cy.wrap(parentElement).find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
                    .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.total[4].time);
            });

        // Check the number of labels in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.mentorCompositeWay.labelStatistic.lastMonth[1].length);

        // Check the first label data in the "Labels Statistic" section for "Last month" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.mentorCompositeWay.labelStatistic.lastMonth[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastMonth[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastMonth[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastMonth[0].time);

        // Check the number of labels in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[1].length);

        // Check the first label data in the "Labels Statistic" section for "Last week" block in the Statistic modal window
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .eq(0)
            .should('have.attr', 'style')
            .and('include', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].color);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.labelName}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].name);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.jobsAmount}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].jobsAmount);
        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.time}"]`)
            .eq(0)
            .should('have.text', statisticsData.mentorCompositeWay.labelStatistic.lastWeek[0].time);
        
        statisticsSelectors.statistics.getCloseButton().click();
    
        // Check "Total reports" and "Total" in the header of day report table on the way page
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.mentorCompositeWay.total.totalReports}`);
    
        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();
    
        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.mentorCompositeWay.total.totalReports})`);
    });

});