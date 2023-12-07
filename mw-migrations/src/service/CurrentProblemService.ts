import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";
import { CurrentProblemDTOMigration } from "../DTOModel/CurrentProblemDTO.js";

const PATH_TO_CURRENT_PROBLEMS_COLLECTION = "currentProblems";

/**
 * Provides methods to interact with the CurrentProblems collection
 */
export class CurrentProblemService {

  /**
   * Get CurrentProblemsDTO
   */
  public static async getCurrentProblemsDTO(): Promise<CurrentProblemDTOMigration[]> {
    const currentProblemRef = collection(db, PATH_TO_CURRENT_PROBLEMS_COLLECTION);
    const currentProblemsRaw = await getDocs(currentProblemRef);
    const currentProblemsDTO = querySnapshotToDTOConverter<CurrentProblemDTOMigration>(currentProblemsRaw);

    return currentProblemsDTO;
  }

}