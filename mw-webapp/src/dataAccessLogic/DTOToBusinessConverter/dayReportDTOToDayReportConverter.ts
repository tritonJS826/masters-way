import {CommentDAL} from "src/dataAccessLogic/CommentDAL";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportDTO} from "src/model/DTOModel/DayReportDTO";

/**
 * Convert {@link DayReportDTO} to {@link DayReport}
 */
export const dayReportDTOToDayReportConverter = async (dayReportDTO: DayReportDTO): Promise<DayReport> => {
  const {jobDoneUuids, planForNextPeriodUuids, commentUuids, problemForCurrentPeriodUuids, uuid, isDayOff, date} = dayReportDTO;

  const jobsDonePromise = Promise.all(jobDoneUuids.map(JobDoneDAL.getJobDone));
  const plansForNextPeriodPromise = Promise.all(planForNextPeriodUuids.map(PlanForNextPeriodDAL.getPlanForNextPeriod));
  const commentsPromise = Promise.all(commentUuids.map(CommentDAL.getComment));
  const problemsForCurrentPeriodPromise = Promise.all(problemForCurrentPeriodUuids.map(CurrentProblemDAL.getCurrentProblem));

  const [jobsDone, plansForNextPeriod, comments, problemsForCurrentPeriod] =
      await Promise.all([jobsDonePromise, plansForNextPeriodPromise, commentsPromise, problemsForCurrentPeriodPromise]);

  return new DayReport({
    uuid,
    isDayOff,
    date: date.toDate(),
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
    comments,
  });
};

