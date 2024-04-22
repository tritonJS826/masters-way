import pdfMake from "pdfmake";
import {
  AMOUNT_DAYS_IN_MONTH,
  AMOUNT_DAYS_IN_WEEK,
  lastMonthDate,
  lastWeekDate,
  MILLISECONDS_IN_DAY,
  SMALL_CORRECTION_MILLISECONDS,
} from "src/logic/wayPage/wayStatistics/WayStatistic";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;

// TODO: there is a problem with pdfMake types, hope next version will fix it
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
pdfMake.fonts = {
  Roboto: {
    normal: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf",
    bold: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf",
    italics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf",
    bolditalics: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf",
  },
};

/**
 * Render header
 */
const getHeader = (wayName: string) => ({
  alignment: "center",
  text: wayName,
  style: "header",
  fontSize: 23,
  bold: true,
  margin: [0, MARGIN_MEDIUM],
});

/**
 * Render owner's name
 */
const getOwner = (wayOwner: string) => ({
  alignment: "center",
  text: wayOwner,
  style: "header",
  fontSize: 18,
  bold: false,
  margin: [0, MARGIN_MEDIUM],
});

/**
 * Render createdAt and lastUpdate dates
 */
const getDates = (createdAt: Date, lastUpdate: Date) => {
  return [
    `Created at: ${DateUtils.getShortISODateValue(createdAt)}`,
    `Last update: ${DateUtils.getShortISODateValue(lastUpdate)}`,
  ];
};

/**
 * Render amount of favorites
 */
const getFavorites = (favoriteAmount: number) => {
  return `Amount of favorites: ${favoriteAmount}`;
};

/**
 * Render mentor's names
 */
const getMentors = (wayMentors: Map<string, UserPlain>) => {
  const mentorsArray = Array.from(wayMentors.values());

  return [
    {
      text: "Mentors:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...mentorsArray.map(wayMentor => wayMentor.name),
  ];
};

/**
 * Render formerMentor's names
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFormerMentors = () => {
  // Const formerMentorsArray = Array.from(wayFormerMentors.values());

  return [
    {
      text: "Former mentors:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    //TODO: fix it
    // ...formerMentorsArray.map(wayFormerMentor => wayFormerMentor.name),
  ];
};

/**
 * Goal params
 */
interface GoalParams {

  /**
   * Goal description
   */
  goalDescription: string;

  /**
   * Estimation time
   */
  estimationTime: number;

  /**
   * Metrics
   */
  metrics: Metric[];
}

/**
 * Render way's goal, estimation time and goalMetrics
 */
const getGoal = (params: GoalParams) => {
  return [
    {
      text: "Goal:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    params.goalDescription,
    {
      text: "Estimation time:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    params.estimationTime,
    {
      text: "Goal metrics:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...params.metrics
      .map((metric) =>
        `${metric.isDone && metric.doneDate
          ? DateUtils.getShortISODateValue(metric.doneDate)
          : "Not finished"}: ${metric}`),
  ];
};

/**
 * Render way's statistics
 */
const getStatistics = (dayReports: DayReport[], wayCreatedAt: Date) => {
  const allDatesTimestamps = dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnAWay = Math.ceil(
    (maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / MILLISECONDS_IN_DAY,
  );
  const totalRecordsAmount = dayReports.length;

  const allJobsAmount = dayReports
    .flatMap(report => report.jobsDone);

  const totalWayTime = allJobsAmount
    .reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const averageWorkingTimeInRecords = Math.round(totalWayTime / totalRecordsAmount);
  const averageWorkingTimeInDay = Math.round(totalWayTime / totalDaysOnAWay);

  const averageTimeForJob = Math.round(totalWayTime / allJobsAmount.length);

  const lastWeekDayReports = dayReports.filter((dayReport) => {
    return dayReport.createdAt > lastWeekDate;
  });

  const lastWeekJobsAmount = lastWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarWeekTotalTime = lastWeekJobsAmount.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastWeek = wayCreatedAt > lastWeekDate ? lastWeekDayReports.length : AMOUNT_DAYS_IN_WEEK;

  const lastCalendarWeekAverageWorkingTime =
    Math.round(lastCalendarWeekTotalTime / amountDaysLastWeek);

  const lastCalendarWeekAverageJobTime = Math.round(lastCalendarWeekTotalTime / lastWeekDayReports.length);

  const lastTwoWeekDayReports = dayReports.filter((dayReport) => {
    return dayReport.createdAt > lastMonthDate;
  });

  const lastTwoWeekJobsAmount = lastTwoWeekDayReports.flatMap(report => report.jobsDone);

  const lastCalendarTwoWeekTotalTime = lastTwoWeekJobsAmount.reduce((totalTime, jobDone) => totalTime + jobDone.time, 0);

  const amountDaysLastTwoWeek = wayCreatedAt > lastMonthDate ? lastTwoWeekDayReports.length : AMOUNT_DAYS_IN_MONTH;

  const lastCalendarTwoWeekAverageWorkingTime =
    Math.round(lastCalendarTwoWeekTotalTime / amountDaysLastTwoWeek);

  const lastCalendarTwoWeekAverageJobTime = Math.round(lastCalendarTwoWeekTotalTime / lastTwoWeekDayReports.length);

  return [
    {
      alignment: "center",
      text: "Statistics",
      style: "header",
      bold: true,
      margin: [0, MARGIN_MEDIUM],
    },
    {
      text: "Total",
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    `Days from start: ${totalDaysOnAWay}`,
    `Total records: ${totalRecordsAmount}`,
    `Total time: ${totalWayTime}`,
    `Average time per calendar day: ${averageWorkingTimeInDay}`,
    `Average working time in working day: ${averageWorkingTimeInRecords}`,
    `Average job time (Shows level of task decomposition): ${averageTimeForJob}`,
    {
      text: "Last week",
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL],
    },
    `Total time: ${lastCalendarWeekTotalTime}`,
    `Average time per calendar day: ${lastCalendarWeekAverageWorkingTime}`,
    `Average time per worked day: ${lastCalendarWeekAverageJobTime}`,
    {
      text: "Last two weeks",
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    `Total time: ${lastCalendarTwoWeekTotalTime}`,
    `Average time per calendar day: ${lastCalendarTwoWeekAverageWorkingTime}`,
    `Average time per worked day: ${lastCalendarTwoWeekAverageJobTime}`,
  ];
};

/**
 * Render report date in pdf
 */
const renderReportDate = (date: Date) => ({
  text: DateUtils.getShortISODateValue(date),
  bold: true,
  margin: [0, MARGIN_MEDIUM, 0, 0],
});

/**
 * Render title
 */
const getTitle = (title: string) => ({
  alignment: "center",
  text: title,
  style: "header",
  bold: true,
  margin: [0, MARGIN_MEDIUM],
});

/**
 * Template to render reports
 */
const getReportsTemplate = (dayReport: DayReport) => {

  /**
   * TODO: improve template to render reports
   */
  return [

    renderReportDate(dayReport.createdAt),
    {
      text: "Jobs done:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...dayReport.jobsDone.map(job => `*${job.time} minutes (tags:${job.tags}): ${job.description}`),
    {
      text: "Plans:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...dayReport.plans.map(plan => plan.description),
    {
      text: "Problems:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...dayReport.problems.map(problem => problem.description),
    {
      text: "Comments:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...dayReport.comments.map(comment => comment.description),
  ];
};

/**
 *
 * Examples:
 * https://codepen.io/diguifi/pen/YdBbyz
 * https://brahmaputra1996.medium.com/
 * client-side-pdf-generation-if-you-struggled-with-dynamic-content-positioning-in-jspdf-459aef48dc30
 */
export const downloadWayPdf = (way: Way) => {
  const headerDefinition = getHeader(way.name);
  const ownerDefinition = getOwner(way.owner.name);
  const datesDefinition = getDates(way.createdAt, way.lastUpdate);
  const favoritesDefinition = getFavorites(way.favoriteForUsersAmount);
  const mentorsDefinition = getMentors(way.mentors);
  const formerMentorsDefinition = getFormerMentors();
  const goalDefinition = getGoal({
    goalDescription: way.goalDescription,
    estimationTime: way.estimationTime,
    metrics: way.metrics,
  });
  const statisticsDefinition = getStatistics(way.dayReports, way.createdAt);
  const dayReportsTitleDefinition = getTitle("Day Reports");
  const reportDefinitions = way.dayReports.reverse().flatMap(getReportsTemplate);

  const docDefinition = {
    content: [
      headerDefinition,
      ownerDefinition,
      datesDefinition,
      favoritesDefinition,
      mentorsDefinition,
      formerMentorsDefinition,
      goalDefinition,
      statisticsDefinition,
      dayReportsTitleDefinition,
      ...reportDefinitions,
    ],
  };

  // TODO: there is a problem with pdfMake types, hope next version will fix it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
