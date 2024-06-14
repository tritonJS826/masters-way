//TODO: fix it
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {Label} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/wayStatistics/WayActiveStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Reports of specific way
   */
  dayReports: DayReport[];

  /**
   * Labels
   */
  labels: Label[];

  /**
   * Date of way created
   */
  wayCreatedAt: Date;

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
 * Get tag related statistics for some jobs
 */
const getTagStats = (jobsDone: JobDone[]) => {
  const tagStatsMap = new Map<string, JobTagStat>();
  const totalJobsTime = jobsDone.reduce((accum, jobDone) => accum + jobDone.time, 0);
  jobsDone.forEach((job: JobDone) => {
    job.tags.forEach((tag: Label) => {
      const AMOUNT_INCREMENT = 1;
      const PERCENTAGE_MULTIPLIER = 100;

      const totalAmount = (tagStatsMap.get(tag.uuid!)?.totalAmount ?? 0) + AMOUNT_INCREMENT;
      const totalAmountPercentage = Math.round(totalAmount / jobsDone.length * PERCENTAGE_MULTIPLIER);
      const totalTime = (tagStatsMap.get(tag.uuid!)?.totalTime ?? 0) + job.time;
      const totalTimePercentage = totalJobsTime === 0
        ? 0
        : Math.round(totalTime / totalJobsTime * PERCENTAGE_MULTIPLIER);

      tagStatsMap.set(tag.uuid!, {
        totalAmount,
        totalAmountPercentage,
        totalTime,
        totalTimePercentage,
        jobTag: tag,
      });
    });
  });

  const tagStats = Array.from(tagStatsMap).map(([, tagStat]) => tagStat);

  return tagStats;
};

/**
 * Render table of reports
 */
export const WayActiveStatistic = observer((props: WayStatisticProps) => {
  const {language} = languageStore;
  if (!props.isVisible) {
    return null;
  }

  const dayReportsReversed = [...props.dayReports].reverse();
  const startDate = dayReportsReversed[0] ? dayReportsReversed[0].createdAt : props.wayCreatedAt;
  const lastDate = props.dayReports[0] ? props.dayReports[0].createdAt : props.wayCreatedAt;
  const lastDateWeek = DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate);
  const startDateLastWeek = startDate <= lastDateWeek ? lastDateWeek : startDate;

  const datesWithJobTotalTime: Map<string, number> = new Map(props.dayReports.map((report) => {
    const jobDoneTotalTime = report.jobsDone.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

    return [DateUtils.getShortISODateValue(report.createdAt), jobDoneTotalTime];
  }));

  const allDatesTimestamps = props.dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnWay = allDatesTimestamps.length
    ? Math.ceil((maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / MILLISECONDS_IN_DAY)
    : 0
    ;

  const totalRecordsAmount = props.dayReports.length;

  const allJobs = props.dayReports.flatMap(report => report.jobsDone);

  /**
   * Sum of all job done
   */
  const totalWayTime = allJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const averageWorkingTimeInRecords = totalWayTime ? Math.round(totalWayTime / totalRecordsAmount) : 0;

  const averageWorkingTimeInDay = totalWayTime ? Math.round(totalWayTime / totalDaysOnWay) : 0;

  const averageTimeForJob = totalWayTime ? Math.round(totalWayTime / allJobs.length) : 0;

  const lastWeekDayReports = props.dayReports
    .filter((dayReport) => DateUtils.roundToDate(dayReport.createdAt) > lastDateWeek);

  const lastWeekJobs = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastWeekTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const lastCalendarWeekTotalTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const averageTimeForJobLastWeek = lastWeekTime ? Math.round(lastWeekTime / lastWeekJobs.length) : 0;

  const amountDaysLastWeek = props.wayCreatedAt > startDateLastWeek ? lastWeekDayReports.length : AMOUNT_DAYS_IN_WEEK;

  const lastCalendarWeekAverageWorkingTime = amountDaysLastWeek ? Math.round(lastCalendarWeekTotalTime / amountDaysLastWeek) : 0;

  const lastCalendarWeekAverageJobTime = lastCalendarWeekTotalTime
    ? Math.round(lastCalendarWeekTotalTime / lastWeekDayReports.length)
    : 0;

  const allTagStats = getTagStats(allJobs);
  const lastWeekTagStats = getTagStats(lastWeekJobs);

  const totalRecordsAmountStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalRecords[language],
    value: totalRecordsAmount,
  };
  const totalWayTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalTime[language],
    value: totalWayTime,
  };
  const averageWorkingTimeInDayStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageTimePerCalendarDay[language],
    value: averageWorkingTimeInDay,
  };
  const averageWorkingTimeInRecordsStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageWorkingTimePerWorkingDay[language],
    value: averageWorkingTimeInRecords,
  };
  const allJobsStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalFinishedJobs[language],
    value: allJobs.length,
  };

  const averageTimeForJobStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageJobTime[language],
    value: averageTimeForJob,
  };

  const totalStatisticItemsPrimary = [
    totalWayTimeStatisticItem,
    totalRecordsAmountStatisticItem,
    allJobsStatisticItem,
  ];

  const totalStatisticItemsSecondary = [
    averageWorkingTimeInDayStatisticItem,
    averageWorkingTimeInRecordsStatisticItem,
    averageTimeForJobStatisticItem,
  ];

  const lastCalendarWeekAverageWorkingTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageTimePerCalendarDay[language],
    value: lastCalendarWeekAverageWorkingTime,
  };

  const lastCalendarWeekAverageJobTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageWorkingTimePerWorkingDay[language],
    value: lastCalendarWeekAverageJobTime,
  };

  const totalWayTimeStatisticItemLastWeek: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalTime[language],
    value: lastWeekTime,
  };

  const totalRecordsAmountStatisticItemLastWeek: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalRecords[language],
    value: lastWeekDayReports.length,
  };

  const allJobsStatisticItemLastWeek: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalFinishedJobs[language],
    value: lastWeekJobs.length,
  };

  const averageTimeForJobStatisticItemLastWeek: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageJobTime[language],
    value: averageTimeForJobLastWeek,
  };

  const statisticItemsLastWeekPrimary = [
    totalWayTimeStatisticItemLastWeek,
    totalRecordsAmountStatisticItemLastWeek,
    allJobsStatisticItemLastWeek,
  ];

  const statisticItemsLastWeek = [
    lastCalendarWeekAverageWorkingTimeStatisticItem,
    lastCalendarWeekAverageJobTimeStatisticItem,
    averageTimeForJobStatisticItemLastWeek,
  ];

  return (
    <div className={styles.wrapper}>

      <StatisticPeriod
        title={LanguageService.way.statisticsBlock.total[language]}
        allTagStats={allTagStats}
        labels={props.labels}
        datesWithJobTotalTime={datesWithJobTotalTime}
        lastDate={lastDate}
        startDate={startDate}
        totalStatisticItemsPrimary={totalStatisticItemsPrimary}
        totalStatisticItemsSecondary={totalStatisticItemsSecondary}
        totalWayTime={totalWayTime}
        isCheckboxShown={false}
      />

      <StatisticPeriod
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        allTagStats={lastWeekTagStats}
        labels={props.labels}
        datesWithJobTotalTime={datesWithJobTotalTime}
        lastDate={lastDate}
        startDate={startDateLastWeek}
        totalStatisticItemsPrimary={statisticItemsLastWeekPrimary}
        totalStatisticItemsSecondary={statisticItemsLastWeek}
        totalWayTime={totalWayTime}
        isCheckboxShown={false}
      />

    </div>
  );
});
