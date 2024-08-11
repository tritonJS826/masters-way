import pdfMake from "pdfmake";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {DateUtils, DAY_MILLISECONDS, SMALL_CORRECTION_MILLISECONDS} from "src/utils/DateUtils";

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
const getFormerMentors = (formerMentors: Map<string, UserPlain>) => {
  const formerMentorsArray = Array.from(formerMentors.values());

  return [
    {
      text: "Former mentors:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    ...formerMentorsArray.map(wayFormerMentor => wayFormerMentor.name),
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
          : "Not finished"}: ${metric.description}`),
  ];
};

/**
 * Render way's statistics
 */
const getStatistics = (dayReports: DayReport[], wayStatistics: WayStatisticsTriple) => {
  const allDatesTimestamps = dayReports.map(report => report.createdAt.getTime());
  const maximumDateTimestamp = Math.max(...allDatesTimestamps);
  const minimumDateTimestamp = Math.min(...allDatesTimestamps);

  const totalDaysOnAWay = Math.ceil(
    (maximumDateTimestamp - minimumDateTimestamp + SMALL_CORRECTION_MILLISECONDS) / DAY_MILLISECONDS,
  );

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
    `Total time: ${wayStatistics.totalPeriod.overallInformation.totalTime}`,
    `Total reports: ${wayStatistics.totalPeriod.overallInformation.totalReports}`,
    `Finished jobs: ${wayStatistics.totalPeriod.overallInformation.finishedJobs}`,
    `Average time per calendar day: ${wayStatistics.totalPeriod.overallInformation.averageTimePerCalendarDay}`,
    `Average working time in working day: ${wayStatistics.totalPeriod.overallInformation.averageTimePerWorkingDay}`,
    `Average job time (Shows level of task decomposition): ${wayStatistics.totalPeriod.overallInformation.averageJobTime}`,
    {
      text: "Last month",
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL],
    },
    `Total time: ${wayStatistics.lastMonth.overallInformation.totalTime}`,
    `Total reports: ${wayStatistics.lastMonth.overallInformation.totalReports}`,
    `Finished jobs: ${wayStatistics.lastMonth.overallInformation.finishedJobs}`,
    `Average time per calendar day: ${wayStatistics.lastMonth.overallInformation.averageTimePerCalendarDay}`,
    `Average working time in working day: ${wayStatistics.lastMonth.overallInformation.averageTimePerWorkingDay}`,
    `Average job time (Shows level of task decomposition): ${wayStatistics.lastMonth.overallInformation.averageJobTime}`,
    {
      text: "Last week",
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL],
    },
    `Total time: ${wayStatistics.lastWeek.overallInformation.totalTime}`,
    `Total reports: ${wayStatistics.lastWeek.overallInformation.totalReports}`,
    `Finished jobs: ${wayStatistics.lastWeek.overallInformation.finishedJobs}`,
    `Average time per calendar day: ${wayStatistics.lastWeek.overallInformation.averageTimePerCalendarDay}`,
    `Average working time in working day: ${wayStatistics.lastWeek.overallInformation.averageTimePerWorkingDay}`,
    `Average job time (Shows level of task decomposition): ${wayStatistics.lastWeek.overallInformation.averageJobTime}`,
  ];
};

/**
 *
 * Examples:
 * https://codepen.io/diguifi/pen/YdBbyz
 * https://brahmaputra1996.medium.com/
 * client-side-pdf-generation-if-you-struggled-with-dynamic-content-positioning-in-jspdf-459aef48dc30
 */
export const downloadWayPdf = (way: Way, statisticsTriple: WayStatisticsTriple) => {
  const headerDefinition = getHeader(way.name);
  const ownerDefinition = getOwner(way.owner.name);
  const datesDefinition = getDates(way.createdAt, way.lastUpdate);
  const favoritesDefinition = getFavorites(way.favoriteForUsersAmount);
  const mentorsDefinition = getMentors(way.mentors);
  const formerMentorsDefinition = getFormerMentors(way.formerMentors);
  const goalDefinition = getGoal({
    goalDescription: way.goalDescription,
    estimationTime: way.estimationTime,
    metrics: way.metrics,
  });
  const statisticsDefinition = getStatistics(way.dayReports, statisticsTriple);

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
    ],
  };

  // TODO: there is a problem with pdfMake types, hope next version will fix it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
