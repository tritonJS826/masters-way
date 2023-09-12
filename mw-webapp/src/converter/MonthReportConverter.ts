import {MonthReport} from "src/model/businessModel/MonthReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {MonthReport as MonthReportDTO} from "src/model/firebaseCollection/MonthReport";
import {JobDoneService} from "src/service/JobDoneService";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";
import {CurrentProblemService} from "src/service/CurrentProblemService";
import {MentorCommentService} from "src/service/MentorCommentService";
import {MentorComment} from "src/model/businessModel/MentorComment";

const jobsDoneRaw = await JobDoneService.onValueFromRealTimeDb();
const plansForNextPeriodRaw = await PlanForNextPeriodService.onValueFromRealTimeDb();
const problemsForCurrentPeriodRaw = await CurrentProblemService.onValueFromRealTimeDb();
const mentorCommentsRaw = await MentorCommentService.onValueFromRealTimeDb();

export const MonthReportDTOToMonthReportConverter = (monthReportRaw: MonthReportDTO) => {
  const jobsDone = monthReportRaw.jobsDone?.map((item) => {
    const jobDone: JobDone = jobsDoneRaw
      .find((elem) => elem.uuid === item) || jobsDoneRaw[0];
    return jobDone;
  });

  const plansForNextPeriod = monthReportRaw.plansForNextPeriod?.map((item) => {
    const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodRaw
      .find((elem) => elem.uuid === item) || plansForNextPeriodRaw[0];
    return planForNextPeriod;
  });

  const problemsForCurrentPeriod = monthReportRaw.problemsForCurrentPeriod?.map((item) => {
    const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodRaw
      .find((elem) => elem.uuid === item) || problemsForCurrentPeriodRaw[0];
    return problemForCurrentPeriod;
  });

  const mentorComments = monthReportRaw.mentorComments?.map((item) => {
    const mentorComment: MentorComment = mentorCommentsRaw
      .find((elem) => elem.uuid === item) || mentorCommentsRaw[0];
    return mentorComment;
  });

  return new MonthReport({
    ...monthReportRaw,
    date: new Date(monthReportRaw.date),
    jobsDone: jobsDone,
    plansForNextPeriod: plansForNextPeriod,
    problemsForCurrentPeriod: problemsForCurrentPeriod,
    mentorComments: mentorComments,
  });
};
