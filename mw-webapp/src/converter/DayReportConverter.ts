import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {CurrentProblemService} from "src/service/CurrentProblemService";
import {JobDoneService} from "src/service/JobDoneService";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

const FIRST_INDEX = 0;

const jobsDoneRaw = await JobDoneService.getJobsDone();
const plansForNextPeriodRaw = await PlanForNextPeriodService.getPlansForNextPeriod();
const problemsForCurrentPeriodRaw = await CurrentProblemService.getCurrentProblems();

export const DayReportDTOToDayReportConverter = (dayReportRaw: DayReportDTO) => {
  const jobsDone = dayReportRaw.jobsDone.map((item) => {
    const jobDone: JobDone = jobsDoneRaw
      .find((elem) => elem.uuid === item) || jobsDoneRaw[FIRST_INDEX];
    return jobDone;
  });

  const plansForNextPeriod = dayReportRaw.plansForNextPeriod.map((item) => {
    const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodRaw
      .find((elem) => elem.uuid === item) || plansForNextPeriodRaw[FIRST_INDEX];
    return planForNextPeriod;
  });

  const problemsForCurrentPeriod = dayReportRaw.problemsForCurrentPeriod.map((item) => {
    const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodRaw
      .find((elem) => elem.uuid === item) || problemsForCurrentPeriodRaw[FIRST_INDEX];
    return problemForCurrentPeriod;
  });

  return new DayReport({
    ...dayReportRaw,
    date: new Date(dayReportRaw.date),
    jobsDone: jobsDone,
    plansForNextPeriod: plansForNextPeriod,
    problemsForCurrentPeriod: problemsForCurrentPeriod,
  });
};
