import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {MentorCommentDTO} from "src/model/firebaseCollection/MentorCommentDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_MENTOR_COMMENTS_COLLECTION = "mentorComments";

/**
 * Provides methods to interact with the MentorComments collection in Firestore.
 */
export class MentorCommentsService {

  /**
   * Read MentorComments collection
   * @returns {Promise<MentorCommentDTO[]>} promise of MentorCommentDTO[]
   */
  public static async getMentorCommentsDTO(): Promise<MentorCommentDTO[]> {
    const mentorCommentsRaw = await getDocs(collection(db, PATH_TO_MENTOR_COMMENTS_COLLECTION));
    const mentorComments: MentorCommentDTO[] = querySnapshotToDTOConverter<MentorCommentDTO>(mentorCommentsRaw);

    return mentorComments;
  }

  /**
   * Read MentorComment by Uuid
   * @returns {Promise<MentorCommentDTO>} promise of MentorCommentDTO
   */
  public static async getMentorCommentDTO(uuid: string): Promise<MentorCommentDTO> {
    const mentorCommentRaw = await getDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid));
    const mentorComment: MentorCommentDTO = documentSnapshotToDTOConverter<MentorCommentDTO>(mentorCommentRaw);

    return mentorComment;
  }

  /**
     * Update MentorComment
     * @param {MentorCommentDTO} data MentorCommentDTO
     */
  public static async updateMentorCommentDTO(data: MentorCommentDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid), {...data});
  }

}