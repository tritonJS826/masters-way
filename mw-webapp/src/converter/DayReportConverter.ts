import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {JobDoneService} from "src/service/JobDoneService";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";
import {CurrentProblemService} from "src/service/CurrentProblemService";

const jobsDoneRaw = await JobDoneService.onValueFromRealTimeDb();
const plansForNextPeriodRaw = await PlanForNextPeriodService.onValueFromRealTimeDb();
const problemsForCurrentPeriodRaw = await CurrentProblemService.onValueFromRealTimeDb();

export const DayReportDTOToDayReportConverter = (dayReportRaw: DayReportDTO) => {
  const jobsDone = dayReportRaw.jobsDone.map((item) => {
    const jobDone: JobDone = jobsDoneRaw
      .find((elem) => elem.uuid === item) || jobsDoneRaw[0];
    return jobDone;
  });

  const plansForNextPeriod = dayReportRaw.plansForNextPeriod.map((item) => {
    const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodRaw
      .find((elem) => elem.uuid === item) || plansForNextPeriodRaw[0];
    return planForNextPeriod;
  });

  const problemsForCurrentPeriod = dayReportRaw.problemsForCurrentPeriod.map((item) => {
    const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodRaw
      .find((elem) => elem.uuid === item) || problemsForCurrentPeriodRaw[0];
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
