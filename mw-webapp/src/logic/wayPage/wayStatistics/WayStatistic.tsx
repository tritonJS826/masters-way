import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/wayStatistics/WayStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Way statistics
   */
  wayStatisticstriple: WayStatisticsTriple;

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

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
export const WayStatistic = observer((props: WayStatisticProps) => {
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
            value: props.wayStatisticstriple.totalPeriod.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalRecords[language],
            value: props.wayStatisticstriple.totalPeriod.overallInformation.totalRecords,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticstriple.totalPeriod.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticstriple.totalPeriod.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticstriple.totalPeriod.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticstriple.totalPeriod.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatisticstriple.totalPeriod}
        title={LanguageService.way.statisticsBlock.total[language]}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalRecords[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.totalRecords,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticstriple.lastMonth.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatisticstriple.lastMonth}
        title={LanguageService.way.statisticsBlock.lastMonth[language]}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalRecords[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.totalRecords,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticstriple.lastWeek.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatisticstriple.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={true}
      />

    </div>
  );
});
