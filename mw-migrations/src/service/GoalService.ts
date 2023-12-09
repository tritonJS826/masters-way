import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase.js";
import {GoalDTO} from "../DTOModel/GoalDTO.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";

const PATH_TO_GOALS_COLLECTION = "goals";

/**
 * Provides methods to interact with the Goals collection
 */
export class GoalService {

  /**
   * Get GoalsDTO
   */
  public static async getGoalsDTO(): Promise<GoalDTO[]> {
    const goalsRef = collection(db, PATH_TO_GOALS_COLLECTION);
    const goalsRaw = await getDocs(goalsRef);
    const goalsDTO = querySnapshotToDTOConverter<GoalDTO>(goalsRaw);

    return goalsDTO;
  }

}
