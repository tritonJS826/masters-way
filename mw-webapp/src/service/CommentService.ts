import {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsByDayReportUuidRequest,
  SchemasCommentPopulatedResponse,
  UpdateCommentRequest,
} from "src/apiAutogenerated";
import {commentService} from "src/service/services";

/**
 * Provides methods to interact with the Comments
 */
export class CommentService {

  /**
   * Get comments by DayReport Uuid
   */
  public async getCommentsByDayReportUuid(
    requestParameters: GetCommentsByDayReportUuidRequest,
  ): Promise<SchemasCommentPopulatedResponse[]> {
    const comments = await commentService.getCommentsByDayReportUuid(requestParameters);

    return comments;
  }

  /**
   * Create comment
   */
  public async createComment(requestParameters: CreateCommentRequest): Promise<SchemasCommentPopulatedResponse> {
    const comment = await commentService.createComment(requestParameters);

    return comment;
  }

  /**
   * Update comment by UUID
   */
  public async updateComment(requestParameters: UpdateCommentRequest): Promise<SchemasCommentPopulatedResponse> {
    const updatedComment = await commentService.updateComment(requestParameters);

    return updatedComment;
  }

  /**
   * Delete comment by UUID
   */
  public async deleteComment(requestParameters: DeleteCommentRequest): Promise<void> {
    await commentService.deleteComment(requestParameters);
  }

}
