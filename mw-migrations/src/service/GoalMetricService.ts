import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase.js";
import { GoalMetricDTONew } from "../DTOModel/GoalMetricDTO.js";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";

const PATH_TO_GOAL_METRICS_COLLECTION = "goalMetrics";

/**
 * Provides methods to interact with the @goalMetrics collection
 */
export class GoalMetricService {

  /**
   * Get GoalMetricsDTO
   */
  public static async getGoalMetricsDTO(): Promise<GoalMetricDTONew[]> {
    const goalMetricsRef = collection(db, PATH_TO_GOAL_METRICS_COLLECTION);
    const goalMetricsRaw = await getDocs(goalMetricsRef);
    const goalMetricsDTO = querySnapshotToDTOConverter<GoalMetricDTONew>(goalMetricsRaw);

    return goalMetricsDTO;
  }

  /**
   * Create GoalMetricsDTO
   */
  public static async createGoalMetricsDTO(goalMetricsDTO: GoalMetricDTONew): Promise<GoalMetricDTONew> {
    const docRef = doc(collection(db, PATH_TO_GOAL_METRICS_COLLECTION));

    await setDoc(docRef, goalMetricsDTO);

    return goalMetricsDTO;
  }

  /**
   * Delete GoalMetricsDTO
   */
  public static async deleteGoalMetricsDTO(goalMetricsUuid: string) {
    deleteDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsUuid));
  }

}
