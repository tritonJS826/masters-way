import {Content, ContentColumns, ContentStack, ContentText, ContentUnorderedList, TDocumentDefinitions} from "pdfmake/interfaces";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {Metric} from "src/model/businessModel/Metric";
import {UserPlain} from "src/model/businessModel/User";
import {Way} from "src/model/businessModel/Way";
import {WayStatisticsTriple} from "src/model/businessModel/WayStatistics";
import {DateUtils, DAY_MILLISECONDS, SMALL_CORRECTION_MILLISECONDS} from "src/utils/DateUtils";
import {pdfMakeLazyLoader} from "src/utils/pdfMakeLazyLoader";

const MARGIN_SMALL = 5;
const MARGIN_MEDIUM = 10;
const MARGIN_LARGE = 15;
const SVG_WIDTH = 16;
const UNCHECKED_CHECKBOX_SVG =
  "<svg width=\"12\" height=\"12\">" +
  "<rect x=\"1\" y=\"1\" width=\"10\" height=\"10\" fill=\"none\" stroke=\"black\"/>" +
  "</svg>";
const CHECKED_SVG =
  "<svg width=\"12\" height=\"12\">" +
  "<rect x=\"1\" y=\"1\" width=\"10\" height=\"10\" fill=\"none\" stroke=\"black\"/>" +
  "<polyline points=\"3,7 6,10 9,3\" style=\"fill:none;stroke:black;stroke-width:2\"/>" +
  "</svg>";

const REPORTS_PER_PAGE = 7;
const DEFAULT_DAY_REPORTS_PAGINATION_VALUE = 1;

/**
 * Fetch all reports for a way using pagination
 */
const getAllDayReports = async (way: Way): Promise<DayReport[]> => {
  const pageAmount = way.dayReportsAmount / REPORTS_PER_PAGE;
  const reports: DayReport[] = [];
  for (let i = 0; i < pageAmount; i++) {
    const dayReports = await DayReportDAL.getDayReports({
      page: i + DEFAULT_DAY_REPORTS_PAGINATION_VALUE,
      wayId: way.uuid,
      wayName: way.name,
    });
    reports.push(...dayReports.dayReports);
  }

  return reports;
};

/**
 * Render header
 */
const getHeader = (way: Way): Content[] => {
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
const getTitle = (wayName: string): ContentText => ({
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
const getOwner = (wayOwner: string): ContentText => ({
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
const getMentors = (wayMentors: Map<string, UserPlain>): Content[] => {
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
const getFormerMentors = (formerMentors: Map<string, UserPlain>): Content[] => {
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
 * Render metric list recursively
 */
const renderMetricList = (metrics: Metric[]): ContentUnorderedList => {

  const items: Content[] = metrics.map(metric => {

    const item: ContentColumns = {
      columns: [
        {
          svg: metric.isDone && metric.doneDate
            ? CHECKED_SVG
            : UNCHECKED_CHECKBOX_SVG,
          width: SVG_WIDTH,
        },
        {text: metric.description},
      ],
    };

    if (metric.children && metric.children.length > 0) {
      const nested: ContentUnorderedList = renderMetricList(metric.children);

      const stackNode: ContentStack = {stack: [item, nested]};

      return stackNode;
    }

    return item;
  });

  const listNode: ContentUnorderedList = {
    ul: items,
    type: "none",
    margin: [MARGIN_SMALL, 0, 0, 0],
  };

  return listNode;
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
 * Render way's goal, estimation time and goal metrics
 */
const getGoal = (params: GoalParams): Content[] => {
  const headerText: ContentText = {
    text: "Goal:",
    bold: true,
    margin: [0, MARGIN_SMALL, 0, 0],
  };

  const estimationText: ContentText = {
    text: `Estimation time: ${params.estimationTime}`,
    bold: true,
    margin: [0, MARGIN_SMALL, 0, 0],
  };

  const metricsHeader: ContentText = {
    text: "Goal metrics:",
    bold: true,
    margin: [0, MARGIN_SMALL, 0, MARGIN_SMALL],
  };

  const metricsList: ContentUnorderedList = renderMetricList(params.metrics);

  return [
    headerText,
    params.goalDescription,
    estimationText,
    metricsHeader,
    metricsList,
  ];
};

/**
 * Render way's statistics
 */
const getStatistics = (dayReports: DayReport[], wayStatistics: WayStatisticsTriple): Content[] => {
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
 * Get header for reports block
 */
const getReportsHeader = (): Content[] => {
  return [
    {
      alignment: "center",
      text: "Reports",
      style: "header",
      bold: true,
      margin: [0, MARGIN_MEDIUM],
    },
  ];
};

/**
 * Get reports
 */
const getReports = async (way: Way): Promise<Content[]> => {
  const dayReports = await getAllDayReports(way);

  return dayReports.flatMap<Content>(day => {
    const dateHeader: ContentText = {
      text: DateUtils.getShortISODateValue(day.createdAt),
      style: "header",
      bold: true,
      margin: [0, MARGIN_LARGE, 0, 0],
    };

    /**
     * Create section header
     */
    const sectionHeader = (label: string): ContentText => ({
      text: label,
      style: "header",
      bold: true,
      margin: [0, MARGIN_SMALL, 0, 0],
    });

    /**
     * Interface for items that can be converted to list items
     */
    interface ListItem {

      /**
       * Description
       */
      description: string;
    }

    /** Creates an unordered list from items */
    const ulFrom = (items: ListItem[]): ContentUnorderedList => ({ul: items.map(item => item.description)});

    return [
      {
        alignment: "center",
        text: dateHeader,
        style: "header",
        bold: true,
        margin: [0, MARGIN_MEDIUM],
      },
      sectionHeader("Jobs Done"), ulFrom(day.jobsDone),
      sectionHeader("Plans"), ulFrom(day.plans),
      sectionHeader("Problems"), ulFrom(day.problems),
      sectionHeader("Comments"), ulFrom(day.comments),
    ];
  });
};

/**
 * Download way as pdf
 */
export const downloadWayPdf = async (way: Way, statisticsTriple: WayStatisticsTriple) => {
  const pdfMake = await pdfMakeLazyLoader();
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
  const reportsHeader = getReportsHeader();
  const reportsDefinition = await getReports(way);

  const docDefinition: TDocumentDefinitions = {
    header: headerDefinition,
    content: [
      titleDefinition,
      datesDefinition,
      ownerDefinition,
      mentorsDefinition,
      formerMentorsDefinition,
      goalDefinition,
      statisticsDefinition,
      reportsHeader,
      reportsDefinition,
    ],
  };

  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
