import {Comment} from "src/model/businessModel/Comment";
import {CommentDTO, CommentDTOSchema} from "src/model/DTOModel/CommentDTO";

/**
 * Convert {@link comment} to {@link commentDTO}
 */
export const commentToCommentDTOConverter = (comment: Comment): CommentDTO => {

  return CommentDTOSchema.parse(comment);
};