import {Timestamp} from "firebase/firestore";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO, DayReportDTOSchema} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport): DayReportDTO => {
  const dayReportDTO: DayReportDTO = {
    uuid: dayReport.uuid,
    isDayOff: dayReport.isDayOff,
    date: Timestamp.fromDate(dayReport.date),
    jobDoneUuids: dayReport.jobsDone.map((jobDone) => jobDone.uuid),
    planForNextPeriodUuids: dayReport.plansForNextPeriod.map((plan) => plan.uuid),
    problemForCurrentPeriodUuids: dayReport.problemsForCurrentPeriod.map((problem) => problem.uuid),
    commentUuids: dayReport.comments.map((comment) => comment.uuid),
    // CreatedAt: Timestamp.fromDate(dayReport.date),
    // jobsDoneStringified: dayReport.jobsDone.map((jobDone) => JSON.stringify(jobDone)),
    // plansStringified: dayReport.plansForNextPeriod.map((plan) => JSON.stringify(plan)),
    // problemsStringified: dayReport.problemsForCurrentPeriod.map((problem) => JSON.stringify(problem)),
    // commentsStringified: dayReport.comments.map((comment) => JSON.stringify(comment)),
  };

  return DayReportDTOSchema.parse(dayReportDTO);
};
