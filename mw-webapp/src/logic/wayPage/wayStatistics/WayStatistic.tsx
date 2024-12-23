import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/wayStatistics/WayStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Way statistics
   */
  wayStatisticsTriple: WayStatisticsTriple;

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

}

/**
 * Render table of reports
 */
export const WayStatistic = observer((props: WayStatisticProps) => {
  const {language} = languageStore;
  if (!props.isVisible) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      data-cy={statisticsAccessIds.statistics.modal}
    >
      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.totalTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalTime("TotalBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalReports("TotalBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.finishedJobs("TotalBlock"),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerCalendarDay("TotalBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerWorkingDay("TotalBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgJobTime("TotalBlock"),
          },
        ]}
        wayStatistics={props.wayStatisticsTriple.totalPeriod}
        title={LanguageService.way.statisticsBlock.total[language]}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.totalTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalTime("MonthBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalReports("MonthBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.finishedJobs("MonthBlock"),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerCalendarDay("MonthBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerWorkingDay("MonthBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgJobTime("MonthBlock"),
          },
        ]}
        wayStatistics={props.wayStatisticsTriple.lastMonth}
        title={LanguageService.way.statisticsBlock.lastMonth[language]}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.totalTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalTime("WeekBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.totalReports("WeekBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.finishedJobs("WeekBlock"),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerCalendarDay("WeekBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgTimePerWorkingDay("WeekBlock"),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo.avgJobTime("WeekBlock"),
          },
        ]}
        wayStatistics={props.wayStatisticsTriple.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={true}
      />

    </div>
  );
});
