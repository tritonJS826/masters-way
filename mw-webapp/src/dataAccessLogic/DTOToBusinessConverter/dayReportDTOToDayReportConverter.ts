import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportDTO} from "src/model/firebaseCollection/DayReportDTO";

interface DayReportProps {
  jobsDone: JobDone[];
  plansForNextPeriod: PlanForNextPeriod[];
  problemsForCurrentPeriod: CurrentProblem[];
}

/**
 * Convert DayReportDTO to DayReport
 * @param dayReportDTO: DayReportDTO
 * @param dayReportProps: {@link DayReportProps}
 * @returns DayReport
 */
export const dayReportDTOToDayReportConverter = (dayReportDTO: DayReportDTO, dayReportProps: DayReportProps) => {
  return new DayReport({
    ...dayReportDTO,
    date: new Date(dayReportDTO.date),
    jobsDone: dayReportProps.jobsDone,
    plansForNextPeriod: dayReportProps.plansForNextPeriod,
    problemsForCurrentPeriod: dayReportProps.problemsForCurrentPeriod,
  });
};

