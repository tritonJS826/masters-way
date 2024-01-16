/* eslint-disable no-magic-numbers */
import pdfMake from "pdfmake";
// Import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

/**
 * Render report date in pdf
 */
const renderReportDate = (date: Date) => ({
  text: DateUtils.getShortISODateValue(date),
  bold: true,
});

/**
 *
 * Examples:
 * https://codepen.io/diguifi/pen/YdBbyz
 * https://brahmaputra1996.medium.com/
 * client-side-pdf-generation-if-you-struggled-with-dynamic-content-positioning-in-jspdf-459aef48dc30
 */
export const downloadWayPdf = (way: Way) => {

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

  const header = {
    alignment: "center",
    text: way.name,
    style: "header",
    fontSize: 23,
    bold: true,
    margin: [0, 10],
  };

  const reportDefinitions = way.dayReports.reverse().flatMap(getReportsTemplate);
  const docDefinition = {
    content: [
      header,
      ...reportDefinitions,
    ],
  };

  const pdf = pdfMake.createPdf(docDefinition);
  pdf.download(`${way.name}.pdf`);
};
