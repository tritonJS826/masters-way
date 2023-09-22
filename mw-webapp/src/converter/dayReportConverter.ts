import {querySnapshot} from "src/converter/querySnapshot";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";

const FIRST_INDEX = 0;

export const querySnapshotToDayReportDTOConverter = (dayReportsRaw: querySnapshot) => {
  const dayReportsDTO: DayReportDTO[] = dayReportsRaw.docs.map((dayReportRaw) => ({
    uuid: dayReportRaw.data().uuid,
    date: dayReportRaw.data().date,
    jobsDone: dayReportRaw.data().jobsDone,
    plansForNextPeriod: dayReportRaw.data().plansForNextPeriod,
    problemsForCurrentPeriod: dayReportRaw.data().problemsForCurrentPeriod,
    studentComments: dayReportRaw.data().studentComments,
    learnedForToday: dayReportRaw.data().learnedForToday,
    mentorComments: dayReportRaw.data().mentorComments,
    isDayOff: dayReportRaw.data().isDayOff,
  }));
  return dayReportsDTO;
};

interface DayReportDTOProps {
  jobsDoneRaw: JobDone[];
  plansForNextPeriodRaw: PlanForNextPeriod[];
  problemsForCurrentPeriodRaw: CurrentProblem[];
}

export const DayReportDTOToDayReportConverter = (dayReportRaw: DayReportDTO, props: DayReportDTOProps) => {
  const jobsDone = dayReportRaw.jobsDone.map((item) => {
    const jobDone: JobDone = props.jobsDoneRaw
      .find((elem) => elem.uuid === item) || props.jobsDoneRaw[FIRST_INDEX];
    return jobDone;
  });

  const plansForNextPeriod = dayReportRaw.plansForNextPeriod.map((item) => {
    const planForNextPeriod: PlanForNextPeriod = props.plansForNextPeriodRaw
      .find((elem) => elem.uuid === item) || props.plansForNextPeriodRaw[FIRST_INDEX];
    return planForNextPeriod;
  });

  const problemsForCurrentPeriod = dayReportRaw.problemsForCurrentPeriod.map((item) => {
    const problemForCurrentPeriod: CurrentProblem = props.problemsForCurrentPeriodRaw
      .find((elem) => elem.uuid === item) || props.problemsForCurrentPeriodRaw[FIRST_INDEX];
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

