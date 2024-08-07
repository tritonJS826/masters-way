import {SchemasCommentPopulatedResponse} from "src/apiAutogenerated/general";
import {Comment} from "src/model/businessModel/Comment";

/**
 * Comment converter params
 */
interface CommentDoneConverterParams {

  /**
   * Plan DTO
   */
  commentDTO: SchemasCommentPopulatedResponse;

  /**
   * Job's way name
   */
  wayName: string;

  /**
   *Job's way uuid
   */
  wayUuid: string;
}

/**
 * Convert {@link CommentDTO} to {@link Comment}
 */
export const commentDTOToComment = (params: CommentDoneConverterParams): Comment => {
  return new Comment({
    ...params.commentDTO,
    createdAt: new Date(params.commentDTO.createdAt),
    updatedAt: new Date(params.commentDTO.updatedAt),
    wayName: params.wayName,
    wayUuid: params.wayUuid,
  });
};
