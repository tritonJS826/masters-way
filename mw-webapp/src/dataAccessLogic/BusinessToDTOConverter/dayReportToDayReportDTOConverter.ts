import {Timestamp} from "firebase/firestore";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO, DayReportDTOSchema} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport): DayReportDTO => {
  const dayReportDTO: DayReportDTO = {
    ...dayReport,
    date: Timestamp.fromDate(dayReport.date),
    jobDoneUuids: dayReport.jobsDone.map((item) => item.uuid),
    planForNextPeriodUuids: dayReport.plansForNextPeriod.map((item) => item.uuid),
    problemForCurrentPeriodUuids: dayReport.problemsForCurrentPeriod.map((item) => item.uuid),
    commentUuids: dayReport.comments.map((item) => item.uuid),
  };

  return DayReportDTOSchema.parse(dayReportDTO);
};