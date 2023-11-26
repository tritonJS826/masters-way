import {mentorCommentToMentorCommentDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/mentorCommentToMentorCommentDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {mentorCommentDTOToMentorCommentConverter}
  from "src/dataAccessLogic/DTOToBusinessConverter/mentorCommentDTOToMentorCommentConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
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
  public static async createMentorComment(
    dayReport: DayReport,
    mentorUuid: string,
    wayPreview: WayPreview): Promise<MentorComment> {
    const mentorCommentWithoutUuid: MentorCommentDTOWithoutUuid = {
      description: UnicodeSymbols.ZERO_WIDTH_SPACE,
      mentorUuid,
      isDone: false,
    };

    const newMentorComment = await MentorCommentService.createMentorCommentDTO(mentorCommentWithoutUuid);

    const mentorComment = mentorCommentDTOToMentorCommentConverter(newMentorComment);
    const updatedMentorComment = [...dayReport.mentorComments, mentorComment];
    const dayReportUpdated = {...dayReport, mentorComments: updatedMentorComment};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    const mentor = await UserPreviewDAL.getUserPreview(mentorUuid);

    /**
     * Get currentMentors
     */
    const getCurrentMentors = () => {
      const mentorsUuids = wayPreview.currentMentors.map((item) => item.uuid);
      if (mentorsUuids.includes(mentorUuid)) {
        return wayPreview.currentMentors;
      } else {
        return [...wayPreview.currentMentors, mentor];
      }
    };

    const updatedWay = new WayPreview({
      uuid: wayPreview.uuid,
      name: wayPreview.name,
      dayReports: wayPreview.dayReports,
      monthReports: wayPreview.monthReports,
      goal: wayPreview.goal,
      owner: wayPreview.owner,
      currentMentors: getCurrentMentors(),
      isCompleted: wayPreview.isCompleted,
    });

    await WayPreviewDAL.updateWayPreview(updatedWay);

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