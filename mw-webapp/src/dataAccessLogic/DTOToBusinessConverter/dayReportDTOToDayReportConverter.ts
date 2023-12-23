import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";

// /**
//  * DayReport props used into converter
//  * Convert {@link DayReportDTO} to {@link DayReport}
//  */
// export interface DayReportConverterProps {

//   /**
//    * Jobs done
//    */
//   jobsDone: JobDone[];

//   /**
//    * Plans for next period
//    */
//   plansForNextPeriod: PlanForNextPeriod[];

//   /**
//    * Problems for current period
//    */
//   problemsForCurrentPeriod: CurrentProblem[];

//   /**
//    * Mentor and way owner's comments
//    */
//   comments: Comment[];
// }

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const dayReportDTOToDayReportConverter = (dayReportDTO: DayReportDTO): DayReport => {

  return new DayReport({
    ...dayReportDTO,
    createdAt: dayReportDTO.createdAt.toDate(),
    jobsDone: dayReportDTO.jobsDoneStringified.map((jobDoneStringified) => JSON.parse(jobDoneStringified)),
    plans: dayReportDTO.plansStringified.map((planStringified) => JSON.parse(planStringified)),
    problems: dayReportDTO.problemsStringified.map((problemStringified) => JSON.parse(problemStringified)),
    comments: dayReportDTO.commentsStringified.map((commentStringified) => JSON.parse(commentStringified)),
  });
};

