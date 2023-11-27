import {commentToCommentDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/commentToCommentDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {commentDTOToCommentConverter} from "src/dataAccessLogic/DTOToBusinessConverter/commentDTOToCommentConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {WayPreviewDAL} from "src/dataAccessLogic/WayPreviewDAL";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {CommentDTOWithoutUuid, CommentService} from "src/service/CommentService";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the Comment business model
 */
export class CommentDAL {

  /**
   * Get Comment by uuid
   */
  public static async getComment(uuid: string): Promise<Comment> {
    const commentDTO = await CommentService.getCommentDTO(uuid);
    const comment = commentDTOToCommentConverter(commentDTO);

    return comment;
  }

  /**
   * Create Comment
   */
  public static async createComment(
    dayReport: DayReport,
    commentatorUuid: string,
    wayPreview: WayPreview): Promise<Comment> {
    const commentWithoutUuid: CommentDTOWithoutUuid = {
      description: UnicodeSymbols.ZERO_WIDTH_SPACE,
      commentatorUuid,
      isDone: false,
    };

    const comment = await CommentService.createCommentDTO(commentWithoutUuid);

    const userComment = commentDTOToCommentConverter(comment);
    const updatedComment = [...dayReport.comments, userComment];
    const dayReportUpdated = {...dayReport, comments: updatedComment};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    const mentor = await UserPreviewDAL.getUserPreview(commentatorUuid);

    /**
     * Get currentMentors
     */
    const getCurrentMentors = () => {
      const mentorsUuids = wayPreview.currentMentors.map((item) => item.uuid);
      if (mentorsUuids.includes(commentatorUuid)) {
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

    return userComment;
  }

  /**
   * Update Comment
   */
  public static async updateComment(comment: Comment, description: string) {
    const updatedComment = new Comment({
      ...comment,
      description,
    });
    const commentDTO = commentToCommentDTOConverter(updatedComment);
    await CommentService.updateCommentDTO(commentDTO, comment.uuid);
  }

}