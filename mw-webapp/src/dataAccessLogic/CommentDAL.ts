import {commentToCommentDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/commentToCommentDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {commentDTOToCommentConverter} from "src/dataAccessLogic/DTOToBusinessConverter/commentDTOToCommentConverter";
import {Comment} from "src/model/businessModel/Comment";
import {DayReport} from "src/model/businessModel/DayReport";
import {CommentDTOWithoutUuid, CommentService} from "src/service/CommentService";

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
    ownerUuid: string): Promise<Comment> {
    const commentWithoutUuid: CommentDTOWithoutUuid = {
      description: "",
      ownerUuid,
      isDone: false,
    };

    const comment = await CommentService.createCommentDTO(commentWithoutUuid);

    const userComment = commentDTOToCommentConverter(comment);
    const updatedComment = [...dayReport.comments, userComment];
    const dayReportUpdated = {...dayReport, comments: updatedComment};
    await DayReportDAL.updateDayReport(dayReportUpdated);

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