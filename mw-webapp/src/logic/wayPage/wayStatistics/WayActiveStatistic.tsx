import {statisticsAccessIds, WayPagePeriodBlockTitles} from "cypress/accessIds/statisticsAccessIds";
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
              .totalTime(WayPagePeriodBlockTitles.Total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.totalPeriod.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(WayPagePeriodBlockTitles.Total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.totalPeriod.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(WayPagePeriodBlockTitles.Total),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(WayPagePeriodBlockTitles.Total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(WayPagePeriodBlockTitles.Total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.totalPeriod.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(WayPagePeriodBlockTitles.Total),
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
              .totalTime(WayPagePeriodBlockTitles.LastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatistics.lastWeek.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(WayPagePeriodBlockTitles.LastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatistics.lastWeek.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(WayPagePeriodBlockTitles.LastWeek),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(WayPagePeriodBlockTitles.LastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(WayPagePeriodBlockTitles.LastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatistics.lastWeek.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(WayPagePeriodBlockTitles.LastWeek),
          },
        ]}
        wayStatistics={props.wayStatistics.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={false}
      />

    </div>
  );
});
