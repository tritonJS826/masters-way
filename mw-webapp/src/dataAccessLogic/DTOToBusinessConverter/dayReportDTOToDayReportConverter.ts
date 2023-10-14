import {DayReportConverterProps} from "src/dataAccessLogic/getConvertedValues";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const dayReportDTOToDayReportConverter =
  (dayReportDTO: DayReportDTO, dayReportProps: DayReportConverterProps): DayReport => {
    return new DayReport({
      ...dayReportDTO,
      date: new Date(dayReportDTO.date),
      jobsDone: dayReportProps.jobsDone,
      plansForNextPeriod: dayReportProps.plansForNextPeriod,
      problemsForCurrentPeriod: dayReportProps.problemsForCurrentPeriod,
      mentorComments: dayReportProps.mentorComments,
    });
  };

