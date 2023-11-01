import {mentorCommentToMentorCommentDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/mentorCommentToMentorCommentDTOConverter";
import {mentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentDTOWithoutUuid, MentorCommentService} from "src/service/MentorCommentService";
import {SPACE} from "src/utils/unicodeSymbols";

/**
 * Provides methods to interact with the MentorComment business model
 */
export class MentorCommentDAL {

  /**
   * Get MentorComments
   */
  public static async getMentorComments(): Promise<MentorComment[]> {
    const mentorCommentsDTO = await MentorCommentService.getMentorCommentsDTO();
    const mentorComments = mentorCommentsDTO.map(mentorCommentDTOToMentorCommentConverter);

    return mentorComments;
  }

  /**
   * Get MentorComment by uuid
   */
  public static async getMentorComment(uuid: string): Promise<MentorComment> {
    const mentorCommentDTO = await MentorCommentService.getMentorCommentDTO(uuid);
    const mentorComment = mentorCommentDTOToMentorCommentConverter(mentorCommentDTO);

    return mentorComment;
  }

  /**
   * Create MentorComment
   */
  public static async createMentorComment(): Promise<MentorComment> {
    const mentorCommentWithoutUuid: MentorCommentDTOWithoutUuid = {
      description: SPACE,
      mentorUuid: "",
      isDone: false,
    };

    const newMentorComment = await MentorCommentService.createMentorCommentDTO(mentorCommentWithoutUuid);

    const mentorComment = mentorCommentDTOToMentorCommentConverter(newMentorComment);

    return mentorComment;
  }

  /**
   * Update MentorComment
   */
  public static async updateMentorComment(mentorComment: MentorComment) {
    const mentorCommentDTO = mentorCommentToMentorCommentDTOConverter(mentorComment);
    await MentorCommentService.updateMentorCommentDTO(mentorCommentDTO, mentorComment.uuid);
  }

}