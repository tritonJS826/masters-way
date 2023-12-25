import {collection, getDoc, getDocs, doc} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { CommentDTO, CommentDTOMigration } from "../DTOModel/CommentDTO.js";
import { documentSnapshotToDTOConverter } from "../converter/documentSnapshotToDTOConverter.js";

const PATH_TO_COMMENTS_COLLECTION = "comments";

/**
 * Provides methods to interact with the Comments collection
 */
export class CommentService {

  /**
   * Get CommentsDTO
   */
  public static async getCommentsDTO(): Promise<CommentDTOMigration[]> {
    const commentsRef = collection(db, PATH_TO_COMMENTS_COLLECTION);
    const commentsRaw = await getDocs(commentsRef);
    const commentsDTO = querySnapshotToDTOConverter<CommentDTOMigration>(commentsRaw);

    return commentsDTO;
  }


  /**
   * Get CommentDTO by Uuid
   */
  public static async getCommentDTO(uuid: string): Promise<CommentDTO> {
    const commentRaw = await getDoc(doc(db, PATH_TO_COMMENTS_COLLECTION, uuid));
    const commentDTO = documentSnapshotToDTOConverter<CommentDTO>(commentRaw);

    return commentDTO;
  }

}