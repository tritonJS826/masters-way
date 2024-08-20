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
    <div className={styles.wrapper}>
      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.totalReports,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageJobTime,
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
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.totalReports,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageJobTime,
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
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.totalReports,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.finishedJobs,
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerCalendarDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerWorkingDay,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageJobTime,
          },
        ]}
        wayStatistics={props.wayStatisticsTriple.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={true}
      />

    </div>
  );
});
