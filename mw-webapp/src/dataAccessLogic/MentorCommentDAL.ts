import {mentorCommentToMentorCommentDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/mentorCommentToMentorCommentDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {mentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {MentorCommentDTOWithoutUuid, MentorCommentService} from "src/service/MentorCommentService";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the MentorComment business model
 */
export class MentorCommentDAL {

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
  public static async createMentorComment(dayReportUuid: string): Promise<MentorComment> {
    const mentorCommentWithoutUuid: MentorCommentDTOWithoutUuid = {
      description: UnicodeSymbols.ZERO_WIDTH_SPACE,
      mentorUuid: "",
      isDone: false,
    };

    const newMentorComment = await MentorCommentService.createMentorCommentDTO(mentorCommentWithoutUuid);

    const mentorComment = mentorCommentDTOToMentorCommentConverter(newMentorComment);
    const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
    const updatedMentorComment = [...updatedDayReport.mentorComments, mentorComment];
    const dayReportUpdated = {...updatedDayReport, mentorComments: updatedMentorComment};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    return mentorComment;
  }

  /**
   * Update MentorComment
   */
  public static async updateMentorComment(mentorComment: MentorComment, description: string) {
    const updatedMentorComment = new MentorComment({
      ...mentorComment,
      description,
    });
    const mentorCommentDTO = mentorCommentToMentorCommentDTOConverter(updatedMentorComment);
    await MentorCommentService.updateMentorCommentDTO(mentorCommentDTO, mentorComment.uuid);
  }

}