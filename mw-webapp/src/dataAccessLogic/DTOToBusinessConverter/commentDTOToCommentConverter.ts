import {Comment} from "src/model/businessModel/Comment";
import {CommentDTO} from "src/model/DTOModel/CommentDTO";

/**
 * Convert {@link CommentDTO} to {@link Comment}
 */
export const commentDTOToCommentConverter = (commentDTO: CommentDTO): Comment => {
  return new Comment(commentDTO);
};
