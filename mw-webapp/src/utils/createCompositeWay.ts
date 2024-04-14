import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Create composite way from array of ways
 */
export const createCompositeWay = (compositeWay: Way): Way => {
  // FlatMap or reduce

  const dayReportsComposite = compositeWay.children.flatMap((way) => way.dayReports);
  const dayReportsSorted = dayReportsComposite.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const combinedDayReports: DayReport[] = [];

  dayReportsSorted.forEach(dayReport => {
    const date = DateUtils.getShortISODateValue(dayReport.createdAt);

    const combinedDayReportsIncludeDayReport = combinedDayReports
      .find(combinedObject => DateUtils.getShortISODateValue(combinedObject.createdAt) === date);

    if (!combinedDayReportsIncludeDayReport) {
      combinedDayReports.push(dayReport);
      // Console.log("1");
    } else {
      // Console.log("2");

      combinedDayReportsIncludeDayReport.jobsDone.push(dayReport.jobsDone[0]);
      // CombinedDayReportsIncludeDayReport.jobsDone.concat(dayReport.jobsDone);
      // combinedDayReportsIncludeDayReport.jobsDone.concat(...dayReport.jobsDone);

      // console.log(combinedDayReportsIncludeDayReport.jobsDone);

      // CombinedDayReportsIncludeDayReport.comments = combinedDayReportsIncludeDayReport.comments.concat(dayReport.comments);
      // combinedDayReportsIncludeDayReport.jobsDone = [...combinedDayReportsIncludeDayReport.jobsDone, ...dayReport.jobsDone];
      // CombinedDayReportsIncludeDayReport.problems = combinedDayReportsIncludeDayReport.problems.concat(dayReport.problems);
      // combinedDayReportsIncludeDayReport.plans = combinedDayReportsIncludeDayReport.plans.concat(dayReport.plans);
    }

  });

  const jobTagsComposite = compositeWay.children.flatMap((way) => way.jobTags);

  // Console.log(dayReportsSorted, combinedDayReports, jobTagsComposite);

  const x = new Way({
    ...compositeWay,
    dayReports: combinedDayReports,
    jobTags: jobTagsComposite,
    // Children: [],

  });

  return x;

};
