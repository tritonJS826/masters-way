import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";

/**
 * Add MentorComment
 */
export const addMentorComment = async (dayReportUuid: string) => {
  const newMentorComment = await MentorCommentDAL.createMentorComment();
  const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
  const updatedMentorComment = [...updatedDayReport.mentorComments, newMentorComment];
  const dayReportUpdated = {...updatedDayReport, mentorComments: updatedMentorComment};
  await DayReportDAL.updateDayReport(dayReportUpdated);
};