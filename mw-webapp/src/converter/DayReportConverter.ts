import {DayReport} from "src/model/businessModel/DayReport";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport as DayReportDTO} from "src/model/firebaseCollection/DayReport";
import {JobDoneService} from "src/service/JobDoneService";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";
import {CurrentProblemService} from "src/service/CurrentProblemService";
import {MentorCommentService} from "src/service/MentorCommentService";
import {MentorComment} from "src/model/businessModel/MentorComment";

const jobsDoneRaw = await JobDoneService.getValueFromRealTimeDb();
const plansForNextPeriodRaw = await PlanForNextPeriodService.getValueFromRealTimeDb();
const problemsForCurrentPeriodRaw = await CurrentProblemService.getValueFromRealTimeDb();
const mentorCommentsRaw = await MentorCommentService.getValueFromRealTimeDb();

export const DayReportDTOToDayReportConverter = (dayReportRaw: DayReportDTO) => {
  const jobsDone = dayReportRaw.jobsDone?.map((item) => {
    const jobDone: JobDone = jobsDoneRaw
      .find((elem) => elem.uuid === item) || jobsDoneRaw[0];
    return jobDone;
  });

  const plansForNextPeriod = dayReportRaw.plansForNextPeriod?.map((item) => {
    const planForNextPeriod: PlanForNextPeriod = plansForNextPeriodRaw
      .find((elem) => elem.uuid === item) || plansForNextPeriodRaw[0];
    return planForNextPeriod;
  });

  const problemsForCurrentPeriod = dayReportRaw.problemsForCurrentPeriod?.map((item) => {
    const problemForCurrentPeriod: CurrentProblem = problemsForCurrentPeriodRaw
      .find((elem) => elem.uuid === item) || problemsForCurrentPeriodRaw[0];
    return problemForCurrentPeriod;
  });

  const mentorComments = dayReportRaw.mentorComments?.map((item) => {
    const mentorComment: MentorComment = mentorCommentsRaw
      .find((elem) => elem.uuid === item) || mentorCommentsRaw[0];
    return mentorComment;
  });

  return new DayReport({
    ...dayReportRaw,
    date: new Date(dayReportRaw.date),
    jobsDone: jobsDone,
    plansForNextPeriod: plansForNextPeriod,
    problemsForCurrentPeriod: problemsForCurrentPeriod,
    mentorComments: mentorComments,
  });
};
