import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";
import {DateUtils} from "src/utils/DateUtils";

interface DayReportDTOProps {
  jobsDone: string[];
  plansForNextPeriod: string[];
  problemsForCurrentPeriod: string[];
}

/**
 * Convert {@link DayReport} to {@link DayReportDTO}
 * @param {DayReport} dayReport
 * @param {DayReportDTOProps} dayReportDTOProps - {@link DayReportDTOtProps}
 * @returns {DayReportDTO} {@link DayReportDTO}
 */
export const dayReportToDayReportDTOConverter = (dayReport: DayReport, dayReportDTOProps: DayReportDTOProps): DayReportDTO => {
  return new DayReportDTO({
    ...dayReport,
    date: DateUtils.getShortISODateValue(dayReport.date),
    jobsDone: dayReportDTOProps.jobsDone,
    plansForNextPeriod: dayReportDTOProps.plansForNextPeriod,
    problemsForCurrentPeriod: dayReportDTOProps.problemsForCurrentPeriod,
  });
};

