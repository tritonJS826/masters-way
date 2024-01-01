import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {DayReport} from "src/model/businessModel/DayReport";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/logic/wayPage/WayStatistic.module.scss";

/**
 * Reports table props
 */
interface WayStatisticProps {

  /**
   * Reports of specific way
   */
  dayReports: DayReport[];
}

const MILLISECONDS_IN_DAY = 86_400_000;

/**
 * Used to calculate date properly without libs
 * Example:
 * mathematically time between three Date timestamps is equal 2 days.
 * but in application for 3 records we want to see 3 days
 */
const SMAL_CORECTION_MILLISECONDS = 1;

const AMOUNT_DAYS_IN_WEEK = 7;
const AMOUNT_DAYS_IN_TWO_WEEK = 14;

const lastWeekDate = DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK);
const lastTwoWeekDate = DateUtils.getLastDate(AMOUNT_DAYS_IN_TWO_WEEK);

/**
 * Render table of reports
 */
export const WayStatistic = (props: WayStatisticProps) => {
  const allDatesTimestamps = props.dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnAWay = Math.ceil(
    (maximumDateTimestamp - minimumDateTimestamp + SMAL_CORECTION_MILLISECONDS) / MILLISECONDS_IN_DAY,
  );
  const totalRecordsAmount = props.dayReports.length;
  const totalWorkedRecords = props.dayReports.filter((report) => !report.isDayOff).length;

  const allJobsAmount = props.dayReports
    .flatMap(report => report.jobsDone);

  /**
   * Sum of all job done
   */
  const totalWayTime = allJobsAmount
    .reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const averageWorkingTimeInWorkedRecords = totalWorkedRecords > 0 ? Math.round(totalWayTime / totalWorkedRecords) : 0;
  const averageWorkingTimeInRecords = Math.round(totalWayTime / totalRecordsAmount);
  const averageWorkingTimeInDay = Math.round(totalWayTime / totalDaysOnAWay);

  const averageTimeForJob = Math.round(totalWayTime / allJobsAmount.length);

  const lastWeekDayReports = props.dayReports.filter((dayReport) => {
    return dayReport.createdAt > lastWeekDate;
  });

  const lastWeekJobsAmount = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobsAmount.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const lastCalendarWeekAverageWorkingTime = Math.round(lastCalendarWeekTotalTime / AMOUNT_DAYS_IN_WEEK);

  const lastCalendarWeekAverageJobTime = Math.round(lastCalendarWeekTotalTime / lastWeekJobsAmount.length);

  const lastTwoWeekDayReports = props.dayReports.filter((dayReport) => {
    return dayReport.createdAt > lastTwoWeekDate;
  });

  const lastTwoWeekJobsAmount = lastTwoWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarTwoWeekTotalTime = lastTwoWeekJobsAmount.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const lastCalendarTwoWeekAverageWorkingTime = Math.round(lastCalendarTwoWeekTotalTime / AMOUNT_DAYS_IN_WEEK);

  const lastCalendarTwoWeekAverageJobTime = Math.round(lastCalendarTwoWeekTotalTime / lastWeekJobsAmount.length);

  /**
   * Get Total Statistics
   */
  const getContent = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.alignContent}>
          <p>
            Total days on a way:
          </p>
          {totalDaysOnAWay}
        </div>
        <div className={styles.alignContent}>
          <p>
            Total amount of records:
          </p>
          {totalRecordsAmount}
        </div>
        <div className={styles.alignContent}>
          <p>
            Amount of records marked as worked:
          </p>
          {totalWorkedRecords}
        </div>
        <div className={styles.alignContent}>
          <p>
            Total way time (minutes):
          </p>
          {totalWayTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Average working time per day:
          </p>
          {averageWorkingTimeInDay}
        </div>
        <div className={styles.alignContent}>
          <p>
            Average working time in worked records:
          </p>
          {averageWorkingTimeInWorkedRecords}
        </div>
        <div className={styles.alignContent}>
          <p>
            Average working time in all records:
          </p>
          {averageWorkingTimeInRecords}
        </div>
        <Tooltip content="Shows level of task decomposition">
          <div className={styles.alignContent}>
            <p>
              Average job time:
            </p>
            {averageTimeForJob}
          </div>
        </Tooltip>
        <div className={styles.alignContent}>
          <p>
            Last calendar week total time:
          </p>
          {lastCalendarWeekTotalTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Last calendar week average day time:
          </p>
          {lastCalendarWeekAverageWorkingTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Last calendar week average job time:
          </p>
          {lastCalendarWeekAverageJobTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Last 2 calendar week total time:
          </p>
          {lastCalendarTwoWeekTotalTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Last 2 calendar week average day time:
          </p>
          {lastCalendarTwoWeekAverageWorkingTime}
        </div>
        <div className={styles.alignContent}>
          <p>
            Last 2 calendar week average job time:
          </p>
          {lastCalendarTwoWeekAverageJobTime}
        </div>
      </div>
    );
  };

  const accordionItems = [
    {
      trigger: {child: "Statistics"},
      content: {child: getContent()},
    },
  ];

  return (
    <Accordion
      items={accordionItems}
      type={accordionTypes.multiple}
      className={styles.accordion}
    />
  );
};
