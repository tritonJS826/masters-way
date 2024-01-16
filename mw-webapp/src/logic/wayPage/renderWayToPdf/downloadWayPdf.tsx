/* eslint-disable no-magic-numbers */
import pdfMake from "pdfmake";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

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
  margin: [0, 10],
});

/**
 * Render report date in pdf
 */
const renderReportDate = (date: Date) => ({
  text: DateUtils.getShortISODateValue(date),
  bold: true,
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
    "Jobs done:",
    ...dayReport.jobsDone.map(job => `*${job.time} (tags:${job.tags}) minutes: ${job.description}`),
    "Plans:",
    ...dayReport.plans.map(plan => plan.job),
    "Problems:",
    ...dayReport.problems.map(problem => problem.description),
    "Comments:",
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
  const reportDefinitions = way.dayReports.reverse().flatMap(getReportsTemplate);

  const docDefinition = {
    content: [
      headerDefinition,
      ...reportDefinitions,
    ],
  };

  // TODO: there is a problem with pdfMake types, hope next version will fix it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
