import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";
import {DateUtils} from "src/utils/DateUtils";

/**
 * DayReportDTO props
 */
interface DayReportDTOProps {

  /**
   * @JobsDone.uuids
   */
  jobDoneUuids: string[];

  /**
   * @PlansForNextPeriod.uuids
   */
  planForNextPeriodUuids: string[];

  /**
   * @ProblemsForCurrentPeriod.uuids
   */
  problemForCurrentPeriodUuids: string[];

  /**
   * @MentorComments.uuids
   */
  mentorCommentUuids: string[];
}

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport, dayReportDTOProps: DayReportDTOProps): DayReportDTO => {
  return new DayReportDTO({
    ...dayReport,
    date: DateUtils.getShortISODateValue(dayReport.date),
    jobDoneUuids: dayReportDTOProps.jobDoneUuids,
    planForNextPeriodUuids: dayReportDTOProps.planForNextPeriodUuids,
    problemForCurrentPeriodUuids: dayReportDTOProps.problemForCurrentPeriodUuids,
    mentorCommentUuids: dayReportDTOProps.mentorCommentUuids,
  });
};