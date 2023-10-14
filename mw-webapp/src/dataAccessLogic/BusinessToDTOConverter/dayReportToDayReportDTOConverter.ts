import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {DateUtils} from "src/utils/DateUtils";

/**
 * DayReportDTO props
 */
interface DayReportDTOProps {

  /**
   * @JobsDone.uuids
   */
  jobsDone: string[];

  /**
   * @PlansForNextPeriod.uuids
   */
  plansForNextPeriod: string[];

  /**
   * @ProblemsForCurrentPeriod.uuids
   */
  problemsForCurrentPeriod: string[];

  /**
   * @MentorComments.uuids
   */
  mentorComments: string[];
}

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport, dayReportDTOProps: DayReportDTOProps): DayReportDTO => {
  return new DayReportDTO({
    ...dayReport,
    date: DateUtils.getShortISODateValue(dayReport.date),
    jobsDone: dayReportDTOProps.jobsDone,
    plansForNextPeriod: dayReportDTOProps.plansForNextPeriod,
    problemsForCurrentPeriod: dayReportDTOProps.problemsForCurrentPeriod,
    mentorComments: dayReportDTOProps.mentorComments,
  });
};