import {Comment} from "src/model/businessModel/Comment";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";

/**
 * DayReport props used into converter
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export interface DayReportConverterProps {

  /**
   * Jobs done
   */
  jobsDone: JobDone[];

  /**
   * Plans for next period
   */
  plansForNextPeriod: PlanForNextPeriod[];

  /**
   * Problems for current period
   */
  problemsForCurrentPeriod: CurrentProblem[];

  /**
   * Mentor and way owner's comments
   */
  comments: Comment[];
}

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const dayReportDTOToDayReportConverter =
(dayReportDTO: DayReportDTO, dayReportProps: DayReportConverterProps): DayReport => {

  return new DayReport({
    ...dayReportDTO,
    date: dayReportDTO.date.toDate(),
    jobsDone: dayReportProps.jobsDone,
    plansForNextPeriod: dayReportProps.plansForNextPeriod,
    problemsForCurrentPeriod: dayReportProps.problemsForCurrentPeriod,
    comments: dayReportProps.comments,
  });
};

