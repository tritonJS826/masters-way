import {statisticsAccessIds} from "cypress/accessIds/statisticsAccessIds";
import {statisticsData} from "cypress/testData/statisticTestData";
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
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalTime(statisticsData.periodBlockTitles.modal.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(statisticsData.periodBlockTitles.modal.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(statisticsData.periodBlockTitles.modal.total),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(statisticsData.periodBlockTitles.modal.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(statisticsData.periodBlockTitles.modal.total),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.totalPeriod.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(statisticsData.periodBlockTitles.modal.total),
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
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalTime(statisticsData.periodBlockTitles.modal.lastMonth),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(statisticsData.periodBlockTitles.modal.lastMonth),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(statisticsData.periodBlockTitles.modal.lastMonth),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(statisticsData.periodBlockTitles.modal.lastMonth),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(statisticsData.periodBlockTitles.modal.lastMonth),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastMonth.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(statisticsData.periodBlockTitles.modal.lastMonth),
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
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalTime(statisticsData.periodBlockTitles.modal.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalReports[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.totalReports,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .totalReports(statisticsData.periodBlockTitles.modal.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.totalFinishedJobs[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.finishedJobs,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .finishedJobs(statisticsData.periodBlockTitles.modal.lastWeek),
          },
        ]}
        totalStatisticItemsSecondary={[
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageTimePerCalendarDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerCalendarDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerCalendarDay(statisticsData.periodBlockTitles.modal.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageWorkingTimePerWorkingDay[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageTimePerWorkingDay,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgTimePerWorkingDay(statisticsData.periodBlockTitles.modal.lastWeek),
          },
          {
            text: LanguageService.way.statisticsBlock.overAllInformation.averageJobTime[language],
            value: props.wayStatisticsTriple.lastWeek.overallInformation.averageJobTime,
            dataCy: statisticsAccessIds.statistics.periodBlocks.overallInfo
              .avgJobTime(statisticsData.periodBlockTitles.modal.lastWeek),
          },
        ]}
        wayStatistics={props.wayStatisticsTriple.lastWeek}
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        isCheckboxShown={true}
      />

    </div>
  );
});
