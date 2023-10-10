/* eslint-disable no-console */
import {dayReportDTOToDayReportConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/dayReportDTOToDayReportConverter";
import {getCurrentProblems} from "src/dataAccessLogic/getCurrentProblems";
import {getJobsDone} from "src/dataAccessLogic/getJobsDone";
import {getMentorComments} from "src/dataAccessLogic/getMentorComments";
import {getPlansForNextPeriod} from "src/dataAccessLogic/getPlansForNextPeriod";
import {DayReport} from "src/model/businessModel/DayReport";
import {DayReportService} from "src/service/DayReportService";

/**
 * Day reports
 * @returns {Promise<DayReport[]>}
 */
export const getDayReports = async (): Promise<DayReport[]> => {
  const dayReportsDTO = await DayReportService.getDayReportsDTO();

  const jobsDonePreview = await getJobsDone();
  const plansForNextPeriodPreview = await getPlansForNextPeriod();
  const mentorCommentsPreview = await getMentorComments();
  const problemsForCurrentPeriodPreview = await getCurrentProblems();
  const firstReport = dayReportsDTO[0];

  const jobsDone = firstReport.jobsDone.map((jobDoneUuid) => {
    const jobDone = jobsDonePreview
      .find((elem) => elem.uuid === jobDoneUuid);
    if (!jobDone) {
      throw new Error(`JobDone not found for UUID ${jobDone}`);
    }

    return jobDone;
  });

  const plansForNextPeriod = firstReport.plansForNextPeriod
    .map((planForNextPeriodUuid) => {

      const planForNextPeriod = plansForNextPeriodPreview
        .find((elem) => elem.uuid === planForNextPeriodUuid);
      if (!planForNextPeriod) {
        throw new Error(`PlanForNextPeriod not found for UUID ${planForNextPeriod}`);
      }

      return planForNextPeriod;
    });

  const problemsForCurrentPeriod = firstReport.problemsForCurrentPeriod
    .map((problemForCurrentPeriodUuid) => {
      const problemForCurrentPeriod = problemsForCurrentPeriodPreview
        .find((elem) => elem.uuid === problemForCurrentPeriodUuid);
      if (!problemForCurrentPeriod) {
        throw new Error(`CurrentProblem not found for UUID ${problemForCurrentPeriod}`);
      }

      return problemForCurrentPeriod;
    });

  const mentorComments = firstReport.mentorComments
    .map((mentorCommentUuid) => {
      const mentorComment = mentorCommentsPreview
        .find((elem) => elem.uuid === mentorCommentUuid);
      if (!mentorComment) {
        throw new Error(`MentorComment not found for UUID ${mentorCommentUuid}`);
      }

      return mentorComment;
    });

  const dayReportProps = {
    jobsDone,
    plansForNextPeriod,
    problemsForCurrentPeriod,
    mentorComments,
  };

  const dayReports = dayReportsDTO
    .map((dayReportPreview) => dayReportDTOToDayReportConverter(dayReportPreview, dayReportProps));

  return dayReports;
};