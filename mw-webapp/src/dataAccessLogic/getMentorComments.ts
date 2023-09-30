import {MentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentsService} from "src/service/MentorCommentsService";
import {UserService} from "src/service/UserService";

/**
 * Mentor comments
 * @returns {Promise<MentorComment[]>}
 */
export const getMentorComments = async (): Promise<MentorComment[]> => {
  const mentorCommentsDTO = await MentorCommentsService.getMentorCommentsDTO();
  const usersDTO = await UserService.getUsersDTO();
  const mentorComments = mentorCommentsDTO
    .map((mentorComment) => (MentorCommentDTOToMentorCommentConverter(mentorComment, usersDTO)));

  return mentorComments;
};