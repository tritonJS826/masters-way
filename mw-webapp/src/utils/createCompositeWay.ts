import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Create composite way from array of ways
 */
export const createCompositeWay = (compositeWay: Way): Way => {
  const allDayReports = compositeWay.children.flatMap((way) => way.dayReports);
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

  const jobTagsComposite = compositeWay.children.flatMap((way) => way.jobTags);

  const x = new Way({
    ...compositeWay,
    dayReports: dayReportsComposite,
    jobTags: jobTagsComposite,
  });

  return x;

};
