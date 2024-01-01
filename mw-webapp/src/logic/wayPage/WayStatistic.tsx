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
const AMOUNT_DAYS_IN_TWO_WEEK = 7;

const lastWeekDates = DateUtils.getLastDates(AMOUNT_DAYS_IN_WEEK);
const lastTwoWeekDates = DateUtils.getLastDates(AMOUNT_DAYS_IN_TWO_WEEK);

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
    return lastWeekDates.includes(DateUtils.getShortISODateValue(dayReport.createdAt));
  });

  const lastWeekJobsAmount = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobsAmount.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const lastCalendarWeekAverageWorkingTime = Math.round(lastCalendarWeekTotalTime / AMOUNT_DAYS_IN_WEEK);

  const lastCalendarWeekAverageJobTime = Math.round(lastCalendarWeekTotalTime / lastWeekJobsAmount.length);

  const lastTwoWeekDayReports = props.dayReports.filter((dayReport) => {
    return lastTwoWeekDates.includes(DateUtils.getShortISODateValue(dayReport.createdAt));
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
        <p>
          Total days on a way:
        </p>
        {totalDaysOnAWay}
        <p>
          Total days on a way:
        </p>
        {totalDaysOnAWay}
        <p>
          Total amount of records:
        </p>
        {totalRecordsAmount}
        <p>
          Amount of records marked as worked:
        </p>
        {totalWorkedRecords}
        <p>
          Total way time:
        </p>
        {totalWayTime}
        <p>
          minutes
        </p>
        <p>
          Average working time per day:
        </p>
        {averageWorkingTimeInDay}
        <p>
          Average working time in worked records:
        </p>
        {averageWorkingTimeInWorkedRecords}
        <p>
          Avereage working time in all records:

        </p>
        {averageWorkingTimeInRecords}
        <Tooltip content="Shows level of task decomposition">
          <div>
            Avereage job time:
            {" "}
            {averageTimeForJob}
          </div>
        </Tooltip>
        <p>
          Last calendar week total time:
        </p>
        {lastCalendarWeekTotalTime}
        <p>
          Last calendar week average day time:
          {" "}
          {lastCalendarWeekAverageWorkingTime}
        </p>
        <p>
          Last calendar week average job time:
          {" "}
          {lastCalendarWeekAverageJobTime}
        </p>
        <p>
          Last 2 calendar week total time:
          {" "}
          {lastCalendarTwoWeekTotalTime}
        </p>
        <p>
          Last 2 calendar week average day time:
          {" "}
          {lastCalendarTwoWeekAverageWorkingTime}
        </p>
        <p>
          Last 2 calendar week average job time:
          {" "}
          {lastCalendarTwoWeekAverageJobTime}
        </p>
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
