import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
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

type StatisticLineProps = {

  /**
   * Line description (left part)
   */
  description: string;

  /**
   * Line value (right part)
   */
  value: number;}

/**
 * One line for statistic block
 */
const StatisticLine = (params: StatisticLineProps) => {
  return (
    <p className={styles.alignContent}>
      <span>
        {params.description}
      </span>
      {params.value}
    </p>
  );
};

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

  const allJobsAmount = props.dayReports
    .flatMap(report => report.jobsDone);

  /**
   * Sum of all job done
   */
  const totalWayTime = allJobsAmount
    .reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

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

        <Tooltip content="Shows level of task decomposition">
          <StatisticLine
            description="Average job time:"
            value={averageTimeForJob}
          />
        </Tooltip>
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

        <Title
          level={HeadingLevel.h4}
          text="Last two weeks statistics"
          className={styles.title}
        />
        <StatisticLine
          description="Total time:"
          value={lastCalendarTwoWeekTotalTime}
        />
        <StatisticLine
          description="Average time per calendar day:"
          value={lastCalendarTwoWeekAverageWorkingTime}
        />
        <StatisticLine
          description="Average time per worked day:"
          value={lastCalendarTwoWeekAverageJobTime}
        />
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
