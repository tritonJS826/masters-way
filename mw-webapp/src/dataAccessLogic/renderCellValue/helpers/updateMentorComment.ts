import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {MentorComment} from "src/model/businessModel/MentorComment";

/**
 * Update MentorComment
 */
export const updateMentorComment = async (text: string, uuid: string) => {
  const oldMentorComment = await MentorCommentDAL.getMentorComment(uuid);
  const updatedMentorComment: MentorComment = new MentorComment({
    ...oldMentorComment,
    description: text,
  });
  await MentorCommentDAL.updateMentorComment(updatedMentorComment);
};