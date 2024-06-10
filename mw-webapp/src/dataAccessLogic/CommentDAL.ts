import {Comment} from "src/model/businessModel/Comment";
import {CommentService} from "src/service/CommentService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * CreateComment params
 */
interface CreateCommentParams {

  /**
   * Owner UUID
   */
  ownerUuid: string;

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;

}

/**
 * Update comment params
 */
interface UpdateCommentParams {

  /**
   * Partial comment to update
   */
  comment: PartialWithUuid<Comment>;

  /**
   * Way's UUID
   */
  wayUuid: string;

  /**
   * Way's name
   */
  wayName: string;
}

/**
 * Provides methods to interact with the comments
 */
export class CommentDAL {

  /**
   * Create comment
   */
  public static async createComment(params: CreateCommentParams): Promise<Comment> {
    const commentDTO = await CommentService.createComment({
      request: {
        dayReportUuid: params.dayReportUuid,
        description: "",
        ownerUuid: params.ownerUuid,
      },
    });

    const comment = new Comment({
      ...commentDTO,
      createdAt: new Date(commentDTO.createdAt),
      updatedAt: new Date(commentDTO.updatedAt),
      dayReportUuid: commentDTO.dayReportUuid,
      wayName: params.wayName,
      wayUuid: params.wayUuid,
    });

    return comment;
  }

  /**
   * Update comment
   */
  public static async updateComment(params: UpdateCommentParams): Promise<Comment> {
    const updatedCommentDTO = await CommentService.updateComment({
      commentId: params.comment.uuid,
      request: params.comment,
    });

    const updatedComment = new Comment({
      ...updatedCommentDTO,
      createdAt: new Date(updatedCommentDTO.createdAt),
      updatedAt: new Date(updatedCommentDTO.updatedAt),
      wayName: params.wayName,
      wayUuid: params.wayUuid,
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
