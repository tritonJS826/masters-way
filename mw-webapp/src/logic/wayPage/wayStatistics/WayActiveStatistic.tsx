//TODO: fix it
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
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

export const MILLISECONDS_IN_DAY = 86_400_000;

/**
 * Used to calculate date properly without libs
 * Example:
 * mathematically time between three Date timestamps is equal 2 days.
 * but in application for 3 records we want to see 3 days
 */
export const SMALL_CORRECTION_MILLISECONDS = 1;
export const AMOUNT_DAYS_IN_WEEK = 7;
export const AMOUNT_DAYS_IN_MONTH = 30;

export const lastWeekDate = DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK);
export const lastMonthDate = DateUtils.getLastDate(AMOUNT_DAYS_IN_MONTH);

/**
 * Render table of reports
 */
export const WayActiveStatistic = observer((props: WayStatisticProps) => {
  const {language} = languageStore;
  if (!props.isVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalRecords[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalRecords,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.totalPeriod.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatistics.totalPeriod}
        title={LanguageService.way.statisticsBlock.total[language]}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.lastMonth.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalRecords[language],
            value: props.wayStatistics.lastMonth.overallInformation.totalRecords,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.lastMonth.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.lastMonth.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.lastMonth.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.lastMonth.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatistics.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={true}
      />

    </div>
  );
});
