import {Timestamp} from "firebase/firestore";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO, DayReportDTOSchema} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport): DayReportDTO => {
  const dayReportDTO: DayReportDTO = {
    uuid: dayReport.uuid,
    createdAt: Timestamp.fromDate(dayReport.createdAt),
    updatedAt: Timestamp.fromDate(dayReport.updatedAt),
    jobsDoneStringified: dayReport.jobsDone.map((jobDone) => JSON.stringify(jobDone)),
    plansStringified: dayReport.plans.map((plan) => JSON.stringify(plan)),
    problemsStringified: dayReport.problems.map((problem) => JSON.stringify(problem)),
    commentsStringified: dayReport.comments.map((comment) => JSON.stringify(comment)),
    isDayOff: dayReport.isDayOff,
  };

  return DayReportDTOSchema.parse(dayReportDTO);
};
