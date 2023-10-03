import {getMentorComment, updatesMentorComment} from "src/dataAccessLogic/getMentorComments";
import {MentorComment} from "src/model/businessModel/MentorComment";

/**
 * Update data in MentorComments collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateMentorComment = async (text: string, uuid: string) => {
  const oldMentorComment = await getMentorComment(uuid);
  const updatedMentorComment: MentorComment = new MentorComment({
    ...oldMentorComment,
    description: text,
  });
  await updatesMentorComment(updatedMentorComment);
};