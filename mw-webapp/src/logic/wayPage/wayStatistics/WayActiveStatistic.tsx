import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import statisticsData from "cypress/fixtures/statisticsFixture.json";
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/wayStatistics/WayActiveStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

  /**
   * Way statistics
   */
  wayStatistics: WayStatisticsTriple;

}

/**
 * Render table of reports
 */
export const WayActiveStatistic = observer((props: WayStatisticProps) => {
  const {language} = languageStore;
  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      data-cy={statisticsAccessIds.statistics.wayPageStatistics}
    >

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalTime(statisticsData.periodBlockWayPageTitles.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(statisticsData.periodBlockWayPageTitles.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.totalPeriod.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(statisticsData.periodBlockWayPageTitles.total),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(statisticsData.periodBlockWayPageTitles.total),
          },
        ]}
        wayStatistics={props.wayStatistics.totalPeriod}
        title={LanguageService.way.statisticsBlock.total[language]}
        isCheckboxShown={false}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.lastWeek.overallInformation.totalTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalTime(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.lastWeek.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.lastWeek.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(statisticsData.periodBlockWayPageTitles.lastWeek),
          },
        ]}
        wayStatistics={props.wayStatistics.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={false}
      />

    </div>
  );
});
