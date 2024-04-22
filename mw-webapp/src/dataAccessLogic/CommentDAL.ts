import {Comment} from "src/model/businessModel/Comment";
import {CommentService} from "src/service/CommentService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the comments
 */
export class CommentDAL {

  /**
   * Create comment
   */
  public static async createComment(ownerUuid: string, dayReportUuid: string): Promise<Comment> {
    const commentDTO = await CommentService.createComment({
      request: {
        dayReportUuid,
        description: "",
        ownerUuid,
      },
    });

    const comment = new Comment({
      ...commentDTO,
      createdAt: new Date(commentDTO.createdAt),
      updatedAt: new Date(commentDTO.updatedAt),
      dayReportUuid: commentDTO.dayReportUuid,
    });

    return comment;
  }

  /**
   * Update comment
   */
  public static async updateComment(comment: PartialWithUuid<Comment>): Promise<Comment> {
    const updatedCommentDTO = await CommentService.updateComment({
      commentId: comment.uuid,
      request: comment,
    });

    const updatedComment = new Comment({
      ...updatedCommentDTO,
      createdAt: new Date(updatedCommentDTO.createdAt),
      updatedAt: new Date(updatedCommentDTO.updatedAt),

    });

    return updatedComment;
  }

  /**
   * Delete comment
   */
  public static async deleteComment(commentId: string): Promise<void> {
    await CommentService.deleteComment({commentId});
  }

}
