import {DayReport} from "src/model/businessModel/DayReport";

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
  const totalDayOffRecords = props.dayReports.filter((report) => report.isDayOff).length;

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

  return (
    <div>
      <p>
        Total days on a way:
        {" "}
        {totalDaysOnAWay}
      </p>
      <p>
        Total amount of records:
        {" "}
        {totalRecordsAmount}
      </p>
      <p>
        Amount of records marked as worked:
        {" "}
        {totalWorkedRecords}
      </p>
      <p>
        Amount of records marked as day off:
        {" "}
        {totalDayOffRecords}
      </p>
      <p>
        Total way time:
        {" "}
        {totalWayTime}
        {" "}
        minutes
      </p>
      <p>
        Average working time per day:
        {" "}
        {averageWorkingTimeInDay}
      </p>
      <p>
        Average working time in worked records:
        {" "}
        {averageWorkingTimeInWorkedRecords}
      </p>
      <p>
        Avereage working time in all records:
        {" "}
        {averageWorkingTimeInRecords}
      </p>
      <p>
        Avereage job time (shows level of task decomposition):
        {" "}
        {averageTimeForJob}
      </p>
    </div>
  );
};
