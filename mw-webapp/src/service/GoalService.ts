import {collection, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_GOALS_COLLECTION = "goals";

/**
 * GoalDTO props without uuid
 */
export type GoalDTOWithoutUuid = Omit<GoalDTO, "uuid">;

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

  /**
   * Create GoalDTO
   */
  public static async createGoalDTO(data: GoalDTOWithoutUuid): Promise<GoalDTO> {
    const docRef = doc(collection(db, PATH_TO_GOALS_COLLECTION));
    const DEFAULT_GOAL: GoalDTO = {
      ...data,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_GOAL);

    return DEFAULT_GOAL;
  }

}