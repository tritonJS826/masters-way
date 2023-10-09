import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * Provides methods to interact with the CurrentProblems collection
 */
export class CurrentProblemService {

  /**
   * Get CurrentProblemsDTO
   */
  public static async getCurrentProblemsDTO(): Promise<CurrentProblemDTO[]> {
    const currentProblemsRaw = await getDocs(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const currentProblems: CurrentProblemDTO[] = querySnapshotToDTOConverter<CurrentProblemDTO>(currentProblemsRaw);

    return currentProblems;
  }

  /**
   * Get CurrentProblemDTO by Uuid
   */
  public static async getCurrentProblemDTO(uuid: string): Promise<CurrentProblemDTO> {
    const currentProblemRaw = await getDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid));
    const currentProblem: CurrentProblemDTO = documentSnapshotToDTOConverter<CurrentProblemDTO>(currentProblemRaw);

    return currentProblem;
  }

  /**
   * Update CurrentProblemDTO
   */
  public static async updateCurrentProblemDTO(data: CurrentProblemDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid), {...data});
  }

}