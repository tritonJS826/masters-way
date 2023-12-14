import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {CommentDTO, CommentDTOSchema} from "src/model/DTOModel/CommentDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";

const PATH_TO_COMMENTS_COLLECTION = "comments";

/**
 * CommentDTO props without uuid
 */
export type CommentDTOWithoutUuid = Omit<CommentDTO, "uuid">;

/**
 * Provides methods to interact with the Comments collection
 */
export class CommentService {

  /**
   * Get CommentDTO by Uuid
   */
  public static async getCommentDTO(uuid: string): Promise<CommentDTO> {
    const commentRaw = await getDoc(doc(db, PATH_TO_COMMENTS_COLLECTION, uuid));
    const commentDTO = documentSnapshotToDTOConverter<CommentDTO>(commentRaw);

    const validatedCommentDTO = CommentDTOSchema.parse(commentDTO);

    return validatedCommentDTO;
  }

  /**
   * Create new CommentDTO
   */
  public static async createCommentDTO(commentDTOWithoutUuid: CommentDTOWithoutUuid): Promise<CommentDTO> {
    const docRef = doc(collection(db, PATH_TO_COMMENTS_COLLECTION));

    const commentDTO = {
      ...commentDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedCommentDTO = CommentDTOSchema.parse(commentDTO);

    await setDoc(docRef, validatedCommentDTO);

    return validatedCommentDTO;
  }

  /**
   * Update CommentDTO
   */
  public static async updateCommentDTO(commentDTO: CommentDTO, uuid: string) {
    const validatedCommentDTO = CommentDTOSchema.parse(commentDTO);
    await updateDoc(doc(db, PATH_TO_COMMENTS_COLLECTION, uuid), validatedCommentDTO);
  }

}
