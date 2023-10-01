import {MentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentsService} from "src/service/MentorCommentsService";

/**
 * Mentor comments
 * @returns {Promise<MentorComment[]>}
 */
export const getMentorComments = async (): Promise<MentorComment[]> => {
  const mentorCommentsDTO = await MentorCommentsService.getMentorCommentsDTO();
  const mentorComments = mentorCommentsDTO.map((mentorComment) => (MentorCommentDTOToMentorCommentConverter(mentorComment)));

  return mentorComments;
};