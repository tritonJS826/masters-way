import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {MentorCommentDTO} from "src/model/DTOModel/MentorCommentDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_MENTOR_COMMENTS_COLLECTION = "mentorComments";

/**
 * MentorCommentDTO props without uuid
 */
export type MentorCommentDTOWithoutUuid = Omit<MentorCommentDTO, "uuid">;

/**
 * Provides methods to interact with the MentorComments collection
 */
export class MentorCommentService {

  /**
   * Get MentorCommentsDTO
   */
  public static async getMentorCommentsDTO(): Promise<MentorCommentDTO[]> {
    const mentorCommentsRaw = await getDocs(collection(db, PATH_TO_MENTOR_COMMENTS_COLLECTION));
    const mentorComments: MentorCommentDTO[] = querySnapshotToDTOConverter<MentorCommentDTO>(mentorCommentsRaw);

    return mentorComments;
  }

  /**
   * Get MentorCommentDTO by Uuid
   */
  public static async getMentorCommentDTO(uuid: string): Promise<MentorCommentDTO> {
    const mentorCommentRaw = await getDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid));
    const mentorComment: MentorCommentDTO = documentSnapshotToDTOConverter<MentorCommentDTO>(mentorCommentRaw);

    return mentorComment;
  }

  /**
   * Create new MentorCommentDTO
   */
  public static async createMentorCommentDTO
  (mentorCommentDTOWithoutUuid: MentorCommentDTOWithoutUuid): Promise<MentorCommentDTO> {
    const docRef = doc(collection(db, PATH_TO_MENTOR_COMMENTS_COLLECTION));
    const DEFAULT_MENTOR_COMMENT: MentorCommentDTO = {
      ...mentorCommentDTOWithoutUuid,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_MENTOR_COMMENT);

    return DEFAULT_MENTOR_COMMENT;
  }

  /**
   * Update MentorCommentDTO
   */
  public static async updateMentorCommentDTO(mentorCommentDTO: MentorCommentDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid), {...mentorCommentDTO});
  }

}