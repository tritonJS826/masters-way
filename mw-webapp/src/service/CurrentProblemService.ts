import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {CurrentProblemDTO} from "src/model/DTOModel/CurrentProblemDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * Provides methods to interact with the CurrentProblems collection in Firestore.
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

}