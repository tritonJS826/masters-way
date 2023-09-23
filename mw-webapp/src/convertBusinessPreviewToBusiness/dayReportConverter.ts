import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReportPreview} from "src/model/businessModelPreview/DayReportPreview";

interface DayReportProps {
  jobsDone: JobDone[];
  plansForNextPeriod: PlanForNextPeriod[];
  problemsForCurrentPeriod: CurrentProblem[];
}

export const DayReportPreviewToDayReportConverter = (dayReportPreview: DayReportPreview, dayReportPops: DayReportProps) => {
  return new DayReport({
    ...dayReportPreview,
    date: dayReportPreview.date,
    jobsDone: dayReportPops.jobsDone,
    plansForNextPeriod: dayReportPops.plansForNextPeriod,
    problemsForCurrentPeriod: dayReportPops.problemsForCurrentPeriod,
  });
};

