import {collection, doc, getDoc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
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
   * Get GoalDTO
   */
  public static async getGoalDTO(uuid: string): Promise<GoalDTO> {
    const goalRaw = await getDoc(doc(db, PATH_TO_GOALS_COLLECTION, uuid));
    const goal: GoalDTO = documentSnapshotToDTOConverter<GoalDTO>(goalRaw);

    return goal;
  }

  /**
   * Create GoalDTO
   */
  public static async createGoalDTO(goalDTOWithoutUuid: GoalDTOWithoutUuid): Promise<GoalDTO> {
    const docRef = doc(collection(db, PATH_TO_GOALS_COLLECTION));
    const DEFAULT_GOAL: GoalDTO = {
      ...goalDTOWithoutUuid,
      uuid: docRef.id,
    };

    await setDoc(docRef, DEFAULT_GOAL);

    return DEFAULT_GOAL;
  }

  /**
   * Update GoalDTO
   */
  public static async updateGoalDTO(goalDTO: GoalDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_GOALS_COLLECTION, uuid), {...goalDTO});
  }

}