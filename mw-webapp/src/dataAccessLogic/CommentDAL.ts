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
    const problem = await CommentService.createComment({
      request: {
        dayReportUuid,
        description: "",
        ownerUuid,
      },
    });

    return problem;
  }

  /**
   * Update comment
   */
  public static async updateComment(comment: PartialWithUuid<Comment>): Promise<Comment> {
    const updatedJobDone = await CommentService.updateComment({
      commentId: comment.uuid,
      request: comment,
    });

    return updatedJobDone;
  }

  /**
   * Delete comment
   */
  public static async deleteComment(commentId: string): Promise<void> {
    await CommentService.deleteComment({commentId});
  }

}
