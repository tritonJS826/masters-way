import pdfMake from "pdfmake";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {DateUtils, DAY_MILLISECONDS, SMALL_CORRECTION_MILLISECONDS} from "src/utils/DateUtils";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 15;
const UNCHECKED_CHECKBOX_SVG =
  "<svg width=\"12\" height=\"12\">" +
  "<rect x=\"1\" y=\"1\" width=\"10\" height=\"10\" fill=\"none\" stroke=\"black\"/>" +
  "</svg>";
const CHECKED_SVG =
  "<svg width=\"12\" height=\"12\">" +
  "<rect x=\"1\" y=\"1\" width=\"10\" height=\"10\" fill=\"none\" stroke=\"black\"/>" +
  "<polyline points=\"3,7 6,10 9,3\" style=\"fill:none;stroke:black;stroke-width:2\"/>" +
  "</svg>";

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
const getHeader = (way: Way) => {
  return [
    {
      text: `Way link: https://mastersway.netlify.app/way/${way.uuid}`,
      margin: [MARGIN_SMALL, MARGIN_SMALL, 0, 0],
    },
    {
      text: `PDF Downloaded at: ${DateUtils.getShortISODateValue(new Date())}`,
      margin: [MARGIN_SMALL, 0, 0, 0],
    },
  ];
};

/**
 * Render title
 */
const getTitle = (wayName: string) => ({
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
 * Render mentor's names
 */
const getMentors = (wayMentors: Map<string, UserPlain>) => {
  const mentorsArray = Array.from(wayMentors.values());
  if (mentorsArray.length === 0) {
    return [];
  }

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
  if (formerMentorsArray.length === 0) {
    return [];
  }

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
 * PdfMakeColumn
 */
interface PdfMakeColumn {

  /**
   * SVG
   */
  svg?: string;

  /**
   * Width
   */
  width?: number;
}

/**
 * PdfMakeListItem
 */
interface PdfMakeListItem {

  /**
   * Columns fro corrected rendering SVG
   */
  columns?: PdfMakeColumn[];

  /**
   * Column gap
   */
  columnGap?: number;

  /**
   * List
   */
  ul?: PdfMakeListItem[];

  /**
   * Stack
   */
  stack?: PdfMakeListItem[];

  /**
   * Text
   */
  text?: string;
}

/**
 * Render metric list
 */
const renderMetricList = (metrics: Metric[]): PdfMakeListItem[] => {
  return metrics.map(metric => {
    const item = {
      columns: [
        {svg: metric.isDone && metric.doneDate ? CHECKED_SVG : UNCHECKED_CHECKBOX_SVG, width: 16},
        {text: metric.description},
      ],
      columnGap: 15,
    };

    if (metric.children && metric.children.length > 0) {
      return {
        stack: [
          item,
          {
            ul: renderMetricList(metric.children),
            listType: "none",
          },
        ],
      };
    }

    return item;
  });
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
      text: `Estimation time: ${params.estimationTime}`,
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    },
    {
      text: "Goal metrics:",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, MARGIN_SMALL],
    },
    {
      ul: renderMetricList(params.metrics),
      listType: "none",
      margin: [MARGIN_SMALL, 0, 0, 0],
    },
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
 * Render reports
 */
const getReports = (dayReports: DayReport[]) => {
  return [
    {
      alignment: "center",
      text: "Reports",
      style: "header",
      bold: true,
      margin: [0, MARGIN_MEDIUM],
    },
    ...dayReports.map(dayReport => [
      {
        text: DateUtils.getShortISODateValue(dayReport.createdAt),
        style: "header",
        bold: true,
        margin: [0, MARGIN_LARGE, 0, 0],
      },
      {
        text: "Jobs Done",
        style: "header",
        bold: true,
        margin: [0, MARGIN_SMALL, 0, 0],
      },
      {ul: dayReport.jobsDone.map(job => job.description)},
      {
        text: "Plans",
        style: "header",
        bold: true,
        margin: [0, MARGIN_SMALL, 0, 0],
      },
      {ul: dayReport.plans.map(plan => plan.description)},
      {
        text: "Problems",
        style: "header",
        bold: true,
        margin: [0, MARGIN_SMALL, 0, 0],
      },
      {ul: dayReport.problems.map(problem => problem.description)},
      {
        text: "Comments",
        style: "header",
        bold: true,
        margin: [0, MARGIN_SMALL, 0, 0],
      },
      {ul: dayReport.comments.map(comment => comment.description)},
    ]),
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
  const headerDefinition = getHeader(way);
  const titleDefinition = getTitle(way.name);
  const ownerDefinition = getOwner(way.owner.name);
  const datesDefinition = getDates(way.createdAt, way.lastUpdate);
  const mentorsDefinition = getMentors(way.mentors);
  const formerMentorsDefinition = getFormerMentors(way.formerMentors);
  const goalDefinition = getGoal({
    goalDescription: way.goalDescription,
    estimationTime: way.estimationTime,
    metrics: way.metrics,
  });
  const statisticsDefinition = getStatistics(way.dayReports, statisticsTriple);
  const reportsDefinition = getReports(way.dayReports);

  const docDefinition = {
    header: headerDefinition,
    content: [
      titleDefinition,
      datesDefinition,
      ownerDefinition,
      mentorsDefinition,
      formerMentorsDefinition,
      goalDefinition,
      statisticsDefinition,
      reportsDefinition,
    ],
  };

  // TODO: there is a problem with pdfMake types, hope next version will fix it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
