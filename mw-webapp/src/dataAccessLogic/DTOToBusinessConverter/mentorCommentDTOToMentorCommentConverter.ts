import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentDTO} from "src/model/DTOModel/MentorCommentDTO";

/**
 * Convert {@link MentorCommentDTO} to {@link MentorComment}
 */
export const mentorCommentDTOToMentorCommentConverter = (mentorCommentDTO: MentorCommentDTO): MentorComment => {
  return new MentorComment(mentorCommentDTO);
};
