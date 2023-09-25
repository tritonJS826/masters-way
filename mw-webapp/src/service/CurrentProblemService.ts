import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * CurrentProblems requests
 */
export class CurrentProblemService {

  /**
   * Read CurrentProblems collection
   * @returns CurrentProblemDTO[]
   */
  public static async getCurrentProblems(): Promise<CurrentProblemDTO[]> {
    const currentProblemsRaw = await getDocs(collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION));
    const currentProblems: CurrentProblemDTO[] = querySnapshotToDTOConverter<CurrentProblemDTO>(currentProblemsRaw);
    return currentProblems;
  }

}