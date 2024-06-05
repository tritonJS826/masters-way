//TODO: fix it
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {observer} from "mobx-react-lite";
import {languageStore} from "src/globalStore/LanguageStore";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
import {StatisticPeriod} from "src/logic/wayPage/wayStatistics/StatisticPeriod";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/wayStatistics/WayStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Reports of specific way
   */
  dayReports: DayReport[];

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
    job.tags.forEach((tag: JobTag) => {
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
export const WayStatistic = observer((props: WayStatisticProps) => {
  const {language} = languageStore;
  if (!props.isVisible) {
    return null;
  }

  const dayReportsReversed = [...props.dayReports].reverse();
  const startDate = dayReportsReversed[0] ? dayReportsReversed[0].createdAt : props.wayCreatedAt;
  const lastDate = props.dayReports[0] ? props.dayReports[0].createdAt : props.wayCreatedAt;

  const startDateLastMonth = startDate <= DateUtils.getLastDate(AMOUNT_DAYS_IN_MONTH, lastDate)
  ? DateUtils.getLastDate(AMOUNT_DAYS_IN_MONTH, lastDate) 
  : startDate;
  
  const startDateLastWeek = startDate <= DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate)
  ? DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate)
  : startDate;

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
    .filter((dayReport) => DateUtils.roundToDate(dayReport.createdAt) > startDateLastWeek);

  const lastWeekJobs = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastWeek = props.wayCreatedAt > startDateLastWeek ? lastWeekDayReports.length : AMOUNT_DAYS_IN_WEEK;

  const lastCalendarWeekAverageWorkingTime = amountDaysLastWeek ? Math.round(lastCalendarWeekTotalTime / amountDaysLastWeek) : 0;

  const lastCalendarWeekAverageJobTime = lastCalendarWeekTotalTime
    ? Math.round(lastCalendarWeekTotalTime / lastWeekDayReports.length)
    : 0;

  const lastWeekTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);
  const averageTimeForJobLastWeek = lastWeekTime ? Math.round(lastWeekTime / lastWeekJobs.length) : 0;

  const lastMonthDayReports = props.dayReports.filter((dayReport) =>
    DateUtils.roundToDate(dayReport.createdAt) > startDateLastMonth);

  const lastMonthJobs = lastMonthDayReports.flatMap(report => report.jobsDone);

  const lastMonthTime = lastMonthJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const lastCalendarMonthTotalTime = lastMonthJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastMonth = props.wayCreatedAt > startDateLastMonth ? lastMonthDayReports.length : AMOUNT_DAYS_IN_MONTH;

  const lastCalendarMonthAverageWorkingTime = lastCalendarMonthTotalTime
    ? Math.round(lastCalendarMonthTotalTime / amountDaysLastMonth)
    : 0;

  const lastCalendarMonthAverageJobTime = lastCalendarMonthTotalTime
    ? Math.round(lastCalendarMonthTotalTime / lastMonthDayReports.length)
    : 0;

  const lastCalendarMonthAverageTimeForJob = lastMonthTime ? Math.round(lastMonthTime / lastMonthJobs.length) : 0;

  const allTagStats = getTagStats(allJobs);
  const lastWeekTagStats = getTagStats(lastWeekJobs);
  const lastMonthTagStats = getTagStats(lastMonthJobs);

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

  const lastCalendarMonthAverageTimePerCalendarDayStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageTimePerCalendarDay[language],
    value: lastCalendarMonthAverageWorkingTime,
  };

  const lastCalendarMonthAverageWorkingTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageWorkingTimePerWorkingDay[language],
    value: lastCalendarMonthAverageJobTime,
  };

  const lastCalendarMonthAverageJobTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageJobTime[language],
    value: lastCalendarMonthAverageTimeForJob,
  };

  const statisticItemsLastMonth = [
    lastCalendarMonthAverageTimePerCalendarDayStatisticItem,
    lastCalendarMonthAverageWorkingTimeStatisticItem,
    lastCalendarMonthAverageJobTimeStatisticItem,
  ];

  const totalWayTimeStatisticItemLastMonth: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalTime[language],
    value: lastMonthTime,
  };

  const totalRecordsAmountStatisticItemLastMonth: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalRecords[language],
    value: lastMonthDayReports.length,
  };

  const allJobsStatisticItemLastMonth: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalFinishedJobs[language],
    value: lastMonthJobs.length,
  };

  const totalStatisticItemsLastMonthPrimary = [
    totalWayTimeStatisticItemLastMonth,
    totalRecordsAmountStatisticItemLastMonth,
    allJobsStatisticItemLastMonth,
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
        datesWithJobTotalTime={datesWithJobTotalTime}
        lastDate={lastDate}
        startDate={startDate}
        totalStatisticItemsPrimary={totalStatisticItemsPrimary}
        totalStatisticItemsSecondary={totalStatisticItemsSecondary}
        totalWayTime={totalWayTime}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        title={LanguageService.way.statisticsBlock.lastMonth[language]}
        allTagStats={lastMonthTagStats}
        datesWithJobTotalTime={datesWithJobTotalTime}
        lastDate={lastDate}
        startDate={startDateLastMonth}
        totalStatisticItemsPrimary={totalStatisticItemsLastMonthPrimary}
        totalStatisticItemsSecondary={statisticItemsLastMonth}
        totalWayTime={totalWayTime}
        isCheckboxShown={true}
      />

      <StatisticPeriod
        title={LanguageService.way.statisticsBlock.lastWeek[language]}
        allTagStats={lastWeekTagStats}
        datesWithJobTotalTime={datesWithJobTotalTime}
        lastDate={lastDate}
        startDate={startDateLastWeek}
        totalStatisticItemsPrimary={statisticItemsLastWeekPrimary}
        totalStatisticItemsSecondary={statisticItemsLastWeek}
        totalWayTime={totalWayTime}
        isCheckboxShown={true}
      />

    </div>
  );
});
