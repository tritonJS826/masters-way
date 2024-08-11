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
    <div className={styles.wrapper}>

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalReports,
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
        isCheckboxShown={false}
      />

      <StatisticPeriod
        totalStatisticItemsPrimary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalTime[language],
            value: props.wayStatistics.lastMonth.overallInformation.totalTime,
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.lastMonth.overallInformation.totalReports,
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
        isCheckboxShown={false}
      />

    </div>
  );
});
