import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {MentorCommentDTO, MentorCommentDTOSchema} from "src/model/DTOModel/MentorCommentDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";

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
   * Get MentorCommentDTO by Uuid
   */
  public static async getMentorCommentDTO(uuid: string): Promise<MentorCommentDTO> {
    const mentorCommentRaw = await getDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid));
    const mentorCommentDTO = documentSnapshotToDTOConverter<MentorCommentDTO>(mentorCommentRaw);

    const validatedMentorCommentDTO = MentorCommentDTOSchema.parse(mentorCommentDTO);

    return validatedMentorCommentDTO;
  }

  /**
   * Create new MentorCommentDTO
   */
  public static async createMentorCommentDTO
  (mentorCommentDTOWithoutUuid: MentorCommentDTOWithoutUuid): Promise<MentorCommentDTO> {
    const docRef = doc(collection(db, PATH_TO_MENTOR_COMMENTS_COLLECTION));

    const mentorCommentDTO = {
      ...mentorCommentDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedMentorCommentDTO = MentorCommentDTOSchema.parse(mentorCommentDTO);

    await setDoc(docRef, validatedMentorCommentDTO);

    return validatedMentorCommentDTO;
  }

  /**
   * Update MentorCommentDTO
   */
  public static async updateMentorCommentDTO(mentorCommentDTO: MentorCommentDTO, uuid: string) {
    const validatedMentorCommentDTO = MentorCommentDTOSchema.parse(mentorCommentDTO);
    await updateDoc(doc(db, PATH_TO_MENTOR_COMMENTS_COLLECTION, uuid), validatedMentorCommentDTO);
  }

}