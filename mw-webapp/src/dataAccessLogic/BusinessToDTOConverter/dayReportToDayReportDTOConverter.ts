import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO, DayReportDTOSchema} from "src/model/DTOModel/DayReportDTO";
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
   * @Comments.uuids
   */
  commentUuids: string[];
}

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport, dayReportDTOProps: DayReportDTOProps): DayReportDTO => {
  const validatedDayReportDTO = DayReportDTOSchema.parse({
    uuid: dayReport.uuid,
    date: DateUtils.getShortISODateValue(dayReport.date),
    jobDoneUuids: dayReportDTOProps.jobDoneUuids,
    planForNextPeriodUuids: dayReportDTOProps.planForNextPeriodUuids,
    problemForCurrentPeriodUuids: dayReportDTOProps.problemForCurrentPeriodUuids,
    commentUuids: dayReportDTOProps.commentUuids,
    isDayOff: dayReport.isDayOff,
  });

  return validatedDayReportDTO;
};