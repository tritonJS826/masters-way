import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";

/**
 * DayReportConverter props
 */
interface DayReportConverterProps {

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
   * Mentor comments
   */
  mentorComments: MentorComment[];
}

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

