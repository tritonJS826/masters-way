//TODO: fix it
/* eslint-disable @typescript-eslint/no-non-null-assertion */
// import {
//   StatisticItem,
//   StatisticItemType,
// } from "./statisticBlock/statisticItem/StatisticItem";
import {AreaChart} from "src/component/chart/AreaChart";
import {BarChart} from "src/component/chart/blockChart/BarChart";
import {HeadingLevel, Title} from "src/component/title/Title";
// Import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {useGlobalContext} from "src/GlobalContext";
import {JobTagStat} from "src/logic/wayPage/wayStatistics/JobTagStat";
import {
  StatisticBlock,
  StatisticBlockType,
} from "src/logic/wayPage/wayStatistics/statisticBlock/StatisticBlock";
import {StatisticItem} from "src/logic/wayPage/wayStatistics/statisticBlock/statisticItem/StatisticItem";
// Import {StatisticLine} from "src/logic/wayPage/wayStatistics/StatisticLine";
import {TagStats} from "src/logic/wayPage/wayStatistics/TagStats";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {JobTag} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LangauageService";
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
export const WayStatistic = (props: WayStatisticProps) => {
  const {language} = useGlobalContext();
  if (!props.isVisible) {
    return null;
  }

  const dayReportsReversed = [...props.dayReports].reverse();
  const startDate = dayReportsReversed[0] ? dayReportsReversed[0].createdAt : props.wayCreatedAt;
  const lastDate = props.dayReports[0] ? props.dayReports[0].createdAt : props.wayCreatedAt;
  const startDateLastWeek = props.wayCreatedAt <= DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate)
    ? DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastDate)
    : startDate;
  const startDateLastMonth = props.wayCreatedAt <= DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastMonthDate)
    ? DateUtils.getLastDate(AMOUNT_DAYS_IN_WEEK, lastMonthDate)
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

  const lastWeekDayReports = props.dayReports.filter((dayReport) => DateUtils.roundToDate(dayReport.createdAt) > lastWeekDate);

  const lastWeekJobs = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastWeek = props.wayCreatedAt > lastWeekDate ? lastWeekDayReports.length : AMOUNT_DAYS_IN_WEEK;

  const lastCalendarWeekAverageWorkingTime = amountDaysLastWeek ? Math.round(lastCalendarWeekTotalTime / amountDaysLastWeek) : 0;

  const lastCalendarWeekAverageJobTime = lastCalendarWeekTotalTime
    ? Math.round(lastCalendarWeekTotalTime / lastWeekDayReports.length)
    : 0;

  const lastMonthDayReports = props.dayReports.filter((dayReport) =>
    DateUtils.roundToDate(dayReport.createdAt) > lastMonthDate);

  const lastMonthJobs = lastMonthDayReports.flatMap(report => report.jobsDone);

  const lastCalendarMonthTotalTime = lastMonthJobs.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastMonth = props.wayCreatedAt > lastMonthDate ? lastMonthDayReports.length : AMOUNT_DAYS_IN_MONTH;

  const lastCalendarMonthAverageWorkingTime = lastCalendarMonthTotalTime
    ? Math.round(lastCalendarMonthTotalTime / amountDaysLastMonth)
    : 0;

  const lastCalendarMonthAverageJobTime = lastCalendarMonthTotalTime
    ? Math.round(lastCalendarMonthTotalTime / lastMonthDayReports.length)
    : 0;

  const allTagStats = getTagStats(allJobs);
  const lastWeekTagStats = getTagStats(lastWeekJobs);
  const lastMonthTagStats = getTagStats(lastMonthJobs);

  const totalDaysOnWayStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.daysFromStart[language],
    value: totalDaysOnWay,
  };

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
    allJobsStatisticItem,
    totalRecordsAmountStatisticItem,
    totalWayTimeStatisticItem,
  ];

  const totalStatisticItemsSecondary = [
    totalDaysOnWayStatisticItem,
    averageWorkingTimeInDayStatisticItem,
    averageWorkingTimeInRecordsStatisticItem,
    averageTimeForJobStatisticItem,
  ];

  const lastCalendarMonthTotalTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalTime[language],
    value: lastCalendarMonthTotalTime,
  };
  const lastCalendarMonthAverageWorkingTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageTimePerCalendarDay[language],
    value: lastCalendarMonthAverageWorkingTime,
  };

  const lastCalendarMonthAverageJobTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageWorkingTimePerWorkingDay[language],
    value: lastCalendarMonthAverageJobTime,
  };

  const statisticItemsLastMonth = [
    lastCalendarMonthTotalTimeStatisticItem,
    lastCalendarMonthAverageWorkingTimeStatisticItem,
    lastCalendarMonthAverageJobTimeStatisticItem,
  ];

  const lastCalendarWeekTotalTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.totalTime[language],
    value: lastCalendarWeekTotalTime,
  };
  const lastCalendarWeekAverageWorkingTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageTimePerCalendarDay[language],
    value: lastCalendarWeekAverageWorkingTime,
  };

  const lastCalendarWeekAverageJobTimeStatisticItem: StatisticItem = {
    text: LanguageService.way.statisticsBlock.averageWorkingTimePerWorkingDay[language],
    value: lastCalendarWeekAverageJobTime,
  };

  const statisticItemsLastWeek = [
    lastCalendarWeekTotalTimeStatisticItem,
    lastCalendarWeekAverageWorkingTimeStatisticItem,
    lastCalendarWeekAverageJobTimeStatisticItem,
  ];

  return (
    <div className={styles.wrapper}>
      <VerticalContainer className={styles.statisticBlock}>
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.total[language]}
        />
        <StatisticBlock
          statisticItems={totalStatisticItemsPrimary}
          type={StatisticBlockType.PRIMARY}
        />
        <StatisticBlock
          statisticItems={totalStatisticItemsSecondary}
          type={StatisticBlockType.SECONDARY}
        />

        <TagStats stats={allTagStats} />

        {!!totalWayTime &&
        <div className={styles.statisticsCharts}>
          <AreaChart
            datesWithJobTotalTime={datesWithJobTotalTime}
            startDate={startDate}
            lastDate={lastDate}
          />
          <BarChart
            itemStats={allTagStats.map(tagStat => ({
              name: tagStat.jobTag.name,
              value: tagStat.totalTime,
              color: tagStat.jobTag.color,
            }))}
            label="Total time"
          />
        </div>
        }
      </VerticalContainer>

      <VerticalContainer className={styles.statisticBlock}>
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.lastMonth[language]}
        />
        <StatisticBlock
          statisticItems={statisticItemsLastMonth}
          type={StatisticBlockType.SECONDARY}
        />

        <TagStats stats={lastMonthTagStats} />

        {!!totalWayTime &&
        <div className={styles.statisticsCharts}>
          <AreaChart
            datesWithJobTotalTime={datesWithJobTotalTime}
            startDate={startDateLastMonth}
            lastDate={lastDate}
          />
          <BarChart
            itemStats={lastMonthTagStats.map(tagStat => ({
              name: tagStat.jobTag.name,
              value: tagStat.totalTime,
              color: tagStat.jobTag.color,
            }))}
            label="Total time"

          />
        </div>
        }
      </VerticalContainer>

      <VerticalContainer className={styles.statisticBlock}>
        <Title
          level={HeadingLevel.h4}
          text={LanguageService.way.statisticsBlock.lastWeek[language]}
        />
        <StatisticBlock
          statisticItems={statisticItemsLastWeek}
          type={StatisticBlockType.SECONDARY}
        />

        <TagStats stats={lastWeekTagStats} />

        {!!totalWayTime &&
        <div className={styles.statisticsCharts}>
          <AreaChart
            datesWithJobTotalTime={datesWithJobTotalTime}
            startDate={startDateLastWeek}
            lastDate={lastDate}
          />
          <BarChart
            itemStats={lastWeekTagStats.map(tagStat => ({
              name: tagStat.jobTag.name,
              value: tagStat.totalTime,
              color: tagStat.jobTag.color,
            }))}
            label="Total time"

          />
        </div>
        }
      </VerticalContainer>
    </div>
  );
};
