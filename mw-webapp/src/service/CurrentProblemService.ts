import {collection, deleteDoc, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO, CurrentProblemDTOSchema} from "src/model/DTOModel/CurrentProblemDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * CurrentProblemDTO props without uuid
 */
export type CurrentProblemDTOWithoutUuid = Omit<CurrentProblemDTO, "uuid">;

/**
 * Provides methods to interact with the CurrentProblems collection
 */
export class CurrentProblemService {

  /**
   * Get CurrentProblemDTO by Uuid
   */
  public static async getCurrentProblemDTO(uuid: string): Promise<CurrentProblemDTO> {
    const currentProblemRaw = await getDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid));
    const currentProblemDTO = documentSnapshotToDTOConverter<CurrentProblemDTO>(currentProblemRaw);

    const validatedCurrentProblemDTO = CurrentProblemDTOSchema.parse(currentProblemDTO);

    return validatedCurrentProblemDTO;
  }

  /**
   * Create new CurrentProblemDTO
   */
  public static async createCurrentProblemDTO
  (currentProblemDTOWithoutUuid: CurrentProblemDTOWithoutUuid): Promise<CurrentProblemDTO> {
    const docRef = doc(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));

    const currentProblemDTO = {
      ...currentProblemDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedCurrentProblemDTO = CurrentProblemDTOSchema.parse(currentProblemDTO);

    await setDoc(docRef, validatedCurrentProblemDTO);

    return validatedCurrentProblemDTO;
  }

  /**
   * Update CurrentProblemDTO
   */
  public static async updateCurrentProblemDTO(currentProblemDTO: CurrentProblemDTO, uuid: string) {
    const validatedCurrentProblemDTO = CurrentProblemDTOSchema.parse(currentProblemDTO);

    await updateDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid), validatedCurrentProblemDTO);
  }

  /**
   * Delete CurrentProblemDTO
   */
  public static async deleteCurrentProblemDTO(currentProblemDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, currentProblemDTOUuid));
  }

}