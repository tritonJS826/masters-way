import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentDTO, MentorCommentDTOSchema} from "src/model/DTOModel/MentorCommentDTO";

/**
 * Convert {@link mentorComment} to {@link mentorCommentDTO}
 */
export const mentorCommentToMentorCommentDTOConverter = (mentorComment: MentorComment): MentorCommentDTO => {
  const validatedMentorCommentDTO = MentorCommentDTOSchema.parse(mentorComment);

  return validatedMentorCommentDTO;
};