import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO} from "src/model/DTOModel/CurrentProblemDTO";
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
    const currentProblem: CurrentProblemDTO = documentSnapshotToDTOConverter<CurrentProblemDTO>(currentProblemRaw);

    return currentProblem;
  }

  /**
   * Create new CurrentProblemDTO
   */
  public static async createCurrentProblemDTO
  (currentProblemDTOWithoutUuid: CurrentProblemDTOWithoutUuid): Promise<CurrentProblemDTO> {
    const docRef = doc(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const DEFAULT_CURRENT_PROBLEM: CurrentProblemDTO = {
      ...currentProblemDTOWithoutUuid,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_CURRENT_PROBLEM);

    return DEFAULT_CURRENT_PROBLEM;
  }

  /**
   * Update CurrentProblemDTO
   */
  public static async updateCurrentProblemDTO(currentProblemDTO: CurrentProblemDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid), {...currentProblemDTO});
  }

}