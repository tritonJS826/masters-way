import {AreaChart} from "src/component/chart/AreaChart";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {StatisticLine} from "src/logic/wayPage/wayStatistics/StatisticLine";
import {TagStats} from "src/logic/wayPage/wayStatistics/TagStats";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
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

      const totalAmount = (tagStatsMap.get(tag.uuid)?.totalAmount ?? 0) + AMOUNT_INCREMENT;
      const totalAmountPercentage = Math.round(totalAmount / jobsDone.length * PERCENTAGE_MULTIPLIER);
      const totalTime = (tagStatsMap.get(tag.uuid)?.totalTime ?? 0) + job.time;
      const totalTimePercentage = Math.round(totalTime / totalJobsTime * PERCENTAGE_MULTIPLIER);

      tagStatsMap.set(tag.uuid, {
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
export const WayStatistic = (props: WayStatisticProps) => {
  if (!props.isVisible) {
    return null;
  }

  const dayReportsReversed = [...props.dayReports].reverse();
  const startDate = dayReportsReversed[0].createdAt;
  const lastDate = props.dayReports[0].createdAt;
  const startDateLastWeek = props.wayCreatedAt <= lastWeekDate
    ? DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate)
    : props.wayCreatedAt;
  const startDateLastMonth = props.wayCreatedAt <= lastMonthDate ? lastMonthDate : props.wayCreatedAt;
  const datesWithJobTotalTime: Map<string, number> = new Map(props.dayReports.map((report) => {
    const jobDoneTotalTime = report.jobsDone.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

    return [DateUtils.getShortISODateValue(report.createdAt), jobDoneTotalTime];
  }));

  const allDatesTimestamps = props.dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnAWay = Math.ceil(
    (maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / MILLISECONDS_IN_DAY,
  );

  const totalRecordsAmount = props.dayReports.length;

  const allJobs = props.dayReports.flatMap(report => report.jobsDone);

  /**
   * Sum of all job done
   */
  const totalWayTime = allJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const averageWorkingTimeInRecords = Math.round(totalWayTime / totalRecordsAmount);

  const averageWorkingTimeInDay = Math.round(totalWayTime / totalDaysOnAWay);

  const averageTimeForJob = Math.round(totalWayTime / allJobs.length);

  const lastWeekDayReports = props.dayReports.filter((dayReport) => DateUtils.roundToDate(dayReport.createdAt) > lastWeekDate);

  const lastWeekJobs = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastWeek = props.wayCreatedAt > lastWeekDate ? lastWeekDayReports.length : AMOUNT_DAYS_IN_WEEK;

  const lastCalendarWeekAverageWorkingTime = Math.round(lastCalendarWeekTotalTime / amountDaysLastWeek);

  const lastCalendarWeekAverageJobTime = Math.round(lastCalendarWeekTotalTime / lastWeekDayReports.length);

  const lastMonthDayReports = props.dayReports.filter((dayReport) =>
    DateUtils.roundToDate(dayReport.createdAt) > lastMonthDate);

  const lastMonthJobs = lastMonthDayReports.flatMap(report => report.jobsDone);

  const lastCalendarMonthTotalTime = lastMonthJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastMonth = props.wayCreatedAt > lastMonthDate ? lastMonthDayReports.length : AMOUNT_DAYS_IN_MONTH;

  const lastCalendarMonthAverageWorkingTime = Math.round(lastCalendarMonthTotalTime / amountDaysLastMonth);

  const lastCalendarMonthAverageJobTime = Math.round(lastCalendarMonthTotalTime / lastMonthDayReports.length);

  const allTagStats = getTagStats(allJobs);
  const lastWeekTagStats = getTagStats(lastWeekJobs);
  const lastMonthTagStats = getTagStats(lastMonthJobs);

  return (
    <div className={styles.wrapper}>
      <Title
        level={HeadingLevel.h4}
        text="Total"
      />
      <StatisticLine
        description="Days from start:"
        value={totalDaysOnAWay}
      />
      <StatisticLine
        description="Total records:"
        value={totalRecordsAmount}
      />
      <StatisticLine
        description="Total time:"
        value={totalWayTime}
      />
      <StatisticLine
        description="Average time per calendar day:"
        value={averageWorkingTimeInDay}
      />
      <StatisticLine
        description="Average working time in working day:"
        value={averageWorkingTimeInRecords}
      />
      <StatisticLine
        description="Total finished jobs:"
        value={allJobs.length}
      />
      <Tooltip content="Shows level of task decomposition">
        <StatisticLine
          description="Average job time:"
          value={averageTimeForJob}
        />
      </Tooltip>

      <TagStats stats={allTagStats} />

      <AreaChart
        datesWithJobTotalTime={datesWithJobTotalTime}
        startDate={startDate}
        lastDate={lastDate}
      />

      <Title
        level={HeadingLevel.h4}
        text="Last week"
        className={styles.title}
      />
      <StatisticLine
        description="Total time:"
        value={lastCalendarWeekTotalTime}
      />
      <StatisticLine
        description="Average time per calendar day:"
        value={lastCalendarWeekAverageWorkingTime}
      />
      <StatisticLine
        description="Average time per worked day:"
        value={lastCalendarWeekAverageJobTime}
      />
      <TagStats stats={lastWeekTagStats} />

      <AreaChart
        datesWithJobTotalTime={datesWithJobTotalTime}
        startDate={startDateLastWeek}
        lastDate={lastDate}
      />

      <Title
        level={HeadingLevel.h4}
        text="Last month (30 days) statistics"
        className={styles.title}
      />
      <StatisticLine
        description="Total time:"
        value={lastCalendarMonthTotalTime}
      />
      <StatisticLine
        description="Average time per calendar day:"
        value={lastCalendarMonthAverageWorkingTime}
      />
      <StatisticLine
        description="Average time per worked day:"
        value={lastCalendarMonthAverageJobTime}
      />

      <TagStats stats={lastMonthTagStats} />

      <AreaChart
        datesWithJobTotalTime={datesWithJobTotalTime}
        startDate={startDateLastMonth}
        lastDate={lastDate}
      />
    </div>
  );
};
