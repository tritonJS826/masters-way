import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Create composite way from array of ways
 */
export const createCompositeWay = (way: Way): Way => {
  const allDayReports = way.children.flatMap((wayChild) => wayChild.dayReports);
  const dayReportsSorted = allDayReports.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const dayReportsHashMap = new Map();

  dayReportsSorted.forEach((dayReportSorted) => {

    const dayReport = dayReportsHashMap.get(DateUtils.getShortISODateValue(dayReportSorted.createdAt));

    if (dayReport) {
      const updatedDayReport = new DayReport({
        ...dayReport,
        jobsDone: [...dayReport.jobsDone, ...dayReportSorted.jobsDone],
        plans: [...dayReport.plans, ...dayReportSorted.plans],
        problems: [...dayReport.problems, ...dayReportSorted.problems],
        comments: [...dayReport.comments, ...dayReportSorted.comments],
      });
      dayReportsHashMap.set(DateUtils.getShortISODateValue(dayReportSorted.createdAt), updatedDayReport);
    } else {
      dayReportsHashMap.set(DateUtils.getShortISODateValue(dayReportSorted.createdAt), dayReportSorted);
    }
  });

  const dayReportsComposite = Array.from(dayReportsHashMap.values());

  const jobTagsComposite = way.children.flatMap((wayChild) => wayChild.jobTags);

  const compositeWay = new Way({
    ...way,
    dayReports: dayReportsComposite,
    jobTags: jobTagsComposite,
  });

  return compositeWay;

};
