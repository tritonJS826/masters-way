import {mentorCommentToMentorCommentDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/mentorCommentToMentorCommentDTOConverter";
import {mentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentsService} from "src/service/MentorCommentsService";

/**
 * Mentor comments
 * @returns {Promise<MentorComment[]>}
 */
export const getMentorComments = async (): Promise<MentorComment[]> => {
  const mentorCommentsDTO = await MentorCommentsService.getMentorCommentsDTO();
  const mentorComments = mentorCommentsDTO.map((mentorComment) => (mentorCommentDTOToMentorCommentConverter(mentorComment)));

  return mentorComments;
};

/**
 * MentorComment
 * @returns {Promise<MentorComment>}
 */
export const getMentorComment = async (uuid: string): Promise<MentorComment> => {
  const mentorCommentDTO = await MentorCommentsService.getMentorCommentDTO(uuid);
  const mentorComment = mentorCommentDTOToMentorCommentConverter(mentorCommentDTO);

  return mentorComment;
};

/**
 * Update mentorComment
 * @param {MentorComment} mentorComment
 */
export const updatesMentorComment = async (mentorComment: MentorComment) => {
  const mentorCommentDTO = mentorCommentToMentorCommentDTOConverter(mentorComment);
  await MentorCommentsService.updateMentorCommentDTO(mentorCommentDTO, mentorComment.uuid);
};