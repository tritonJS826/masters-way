import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {MentorCommentDTO} from "src/model/firebaseCollection/MentorCommentDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_MENTOR_COMMENTS_COLLECTION = "mentorComments";

/**
 * MentorComments requests: {@link getMentorComments}
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

}