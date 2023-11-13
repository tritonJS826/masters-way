import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {MentorComment} from "src/model/businessModel/MentorComment";

/**
 * MentorComment props
 */
interface MentorCommentProps {

  /**
   * Description of MentorComment
   */
  description: string;

  /**
   * MentorComment UUID
   */
  mentorCommentUuid: string;
}

/**
 * Update MentorComment
 */
export const updateMentorComment = async (props: MentorCommentProps) => {
  const oldMentorComment = await MentorCommentDAL.getMentorComment(props.mentorCommentUuid);
  const updatedMentorComment: MentorComment = new MentorComment({
    ...oldMentorComment,
    description: props.description,
  });
  await MentorCommentDAL.updateMentorComment(updatedMentorComment);
};