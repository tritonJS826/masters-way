import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * CurrentProblems requests: {@link getCurrentProblems}
 */
export class CurrentProblemService {

  /**
   * Read CurrentProblems collection
   * @returns {Promise<CurrentProblemDTO[]>} promise of CurrentProblemDTO[]
   */
  public static async getCurrentProblemsDTO(): Promise<CurrentProblemDTO[]> {
    const currentProblemsRaw = await getDocs(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const currentProblems: CurrentProblemDTO[] = querySnapshotToDTOConverter<CurrentProblemDTO>(currentProblemsRaw);
    return currentProblems;
  }

  /**
   * Read CurrentProblem by Uuid
   * @returns {Promise<CurrentProblemDTO>} promise of CurrentProblemDTO
   */
  public static async getCurrentProblemDTO(uuid: string): Promise<CurrentProblemDTO> {
    const currentProblemRaw = await getDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid));
    const currentProblem: CurrentProblemDTO = documentSnapshotToDTOConverter<CurrentProblemDTO>(currentProblemRaw);
    return currentProblem;
  }

  /**
     * Update CurrentProblem
     * @param {CurrentProblemDTO} data CurrentProblemDTO
     */
  public static async updateCurrentProblemDTO(data: CurrentProblemDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION, uuid), {...data});
  }

}