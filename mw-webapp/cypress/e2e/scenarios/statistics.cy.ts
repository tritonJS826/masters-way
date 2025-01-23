import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {allWaysSelectors} from "cypress/scopesSelectors/allWaysSelectors";
import {statisticsSelectors} from "cypress/scopesSelectors/statistics.Selectors";
import statisticsData from "cypress/fixtures/statisticsFixture.json"
import {LanguageService} from "src/service/LanguageService";
import {dayReportsSelectors} from "cypress/scopesSelectors/dayReportsSelectors";

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

        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.total)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

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

        statisticsSelectors.statistics.periodBlocks.periodBlock(statisticsData.periodBlockWayPageTitles.lastWeek)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

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

        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.total.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.total[4].length);

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

        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastMonth.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastMonth[4].length);

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

        statisticsSelectors.statistics.getModal()
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.periodBlock(LanguageService.way.statisticsBlock.lastWeek.en)}"]`)
            .find(`[data-cy="${statisticsAccessIds.statistics.periodBlocks.labelsStatistic.tagColor}"]`)
            .should('have.length', statisticsData.johnDoeWay.labelStatistic.lastWeek[3].length);

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
        
        dayReportsSelectors.dayReportsContent.titleContainer.getTotalHeader()
            .should('have.text', `${LanguageService.way.reportsTable.total.en} ${statisticsData.johnDoeWay.total.totalReports}`);

        dayReportsSelectors.dayReportsContent.getLoadMoreButton().click();

        dayReportsSelectors.dayReportsContent.titleContainer.getReportsHeader()
            .should('have.text', `${LanguageService.way.reportsTable.title.en} (${statisticsData.johnDoeWay.total.totalReports})`);
    });

});