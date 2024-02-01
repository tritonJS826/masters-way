import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import {db} from "../firebase.js";
import {GoalDTO, GoalDTOMigration} from "../DTOModel/GoalDTO.js";
import {querySnapshotToDTOConverter} from "../converter/querySnapshotToDTOConverter.js";

const PATH_TO_GOALS_COLLECTION = "goals";

/**
 * Provides methods to interact with the Goals collection
 */
export class GoalService {

  /**
   * Get GoalsDTO
   */
  public static async getGoalsDTO(): Promise<GoalDTOMigration[]> {
    const goalsRef = collection(db, PATH_TO_GOALS_COLLECTION);
    const goalsRaw = await getDocs(goalsRef);
    const goalsDTO = querySnapshotToDTOConverter<GoalDTOMigration>(goalsRaw);

    return goalsDTO;
  }

  /**
   * Create GoalDTO
   */
  public static async createGoalDTO(goalDTO: GoalDTO): Promise<GoalDTO> {
    const docRef = doc(collection(db, PATH_TO_GOALS_COLLECTION));
  
    await setDoc(docRef, goalDTO);
  
    return goalDTO;
  }

  /**
   * For import purposes
   */
  public static async importGoal(goal: GoalDTO): Promise<GoalDTO> {
    await setDoc(doc(db, PATH_TO_GOALS_COLLECTION, goal.uuid), goal);

    return goal;
  }

  /**
   * Delete GoalDTO
   */
  public static async deleteGoalDTO(dayReportDTOUuid: string) {
    deleteDoc(doc(db, PATH_TO_GOALS_COLLECTION, dayReportDTOUuid));
  }

}
