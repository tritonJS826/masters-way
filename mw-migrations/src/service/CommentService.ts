import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { CommentDTOMigration } from "../DTOModel/CommentDTO.js";

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

}