import {DayReport} from "src/model/businessModel/DayReport";
import {Way} from "src/model/businessModel/Way";
import {DateUtils} from "src/utils/DateUtils";

/**
 * Create composite way from array of ways
 */
export const createCompositeWay = (way: Way): Way => {
  const allDayReports = way.children.flatMap((wayChild) => wayChild.dayReports).concat(way.dayReports);

  const dayReportsHashMap = new Map();

  allDayReports.forEach((oldDayReport) => {

    const dayReport = dayReportsHashMap.get(DateUtils.getShortISODateValue(oldDayReport.createdAt));

    const updatedDayReport = dayReport
      ? new DayReport({
        ...dayReport,
        jobsDone: [...dayReport.jobsDone, ...oldDayReport.jobsDone],
        plans: [...dayReport.plans, ...oldDayReport.plans],
        problems: [...dayReport.problems, ...oldDayReport.problems],
        comments: [...dayReport.comments, ...oldDayReport.comments],
      })
      : oldDayReport;

    const sortedDayReport = new DayReport({
      ...updatedDayReport,
      jobsDone: updatedDayReport.jobsDone.slice().sort((a, b) => DateUtils.datesASCSorter(a.createdAt, b.createdAt)),
      plans: updatedDayReport.plans.slice().sort((a, b) => DateUtils.datesASCSorter(a.createdAt, b.createdAt)),
      problems: updatedDayReport.problems.slice().sort((a, b) => DateUtils.datesASCSorter(a.createdAt, b.createdAt)),
      comments: updatedDayReport.comments.slice().sort((a, b) => DateUtils.datesASCSorter(a.createdAt, b.createdAt)),
    });

    dayReportsHashMap.set(DateUtils.getShortISODateValue(oldDayReport.createdAt), sortedDayReport);
  });

  const dayReportsComposite = Array.from(dayReportsHashMap.values());

  const jobTagsComposite = way.children.flatMap((wayChild) => wayChild.jobTags).concat(way.jobTags);

  const compositeWay = new Way({
    ...way,
    dayReports: dayReportsComposite,
    jobTags: jobTagsComposite,
  });

  return compositeWay;

};
