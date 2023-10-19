import {collection, getDocs} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_GOALS_COLLECTION = "goals";

/**
 * Provides methods to interact with the Goals collection
 */
export class GoalService {

  /**
   * Get GoalsDTO
   */
  public static async getGoalsDTO(): Promise<GoalDTO[]> {
    const goalsRaw = await getDocs(collection(db, PATH_TO_GOALS_COLLECTION));
    const goals: GoalDTO[] = querySnapshotToDTOConverter<GoalDTO>(goalsRaw);

    return goals;
  }

}