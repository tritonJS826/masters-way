import {collection, doc, setDoc} from "firebase/firestore";
import { GoalMetricDTONew } from "../DTOModel/GoalmetricDTO.js";
import { db } from "../firebase.js";

const PATH_TO_GOAL_METRICS_COLLECTION = "goalMetrics";

/**
 * GoalMetricDTO props without uuid
 */
export type GoalMetricDTOWithoutUuid = Omit<GoalMetricDTONew, "uuid">;

/**
 * Provides methods to interact with the @goalMetrics collection
 */
export class GoalMetricService {

  /**
   * Get GoalDTO
   */
  // public static async getGoalMetricsDTO(metricUuid: string): Promise<GoalMetricDTONew> {
  //   const goalMetricsRaw = await getDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, metricUuid));
  //   const goalMetricsDTO = documentSnapshotToDTOConverter<GoalMetricDTONew>(goalMetricsRaw);

  //   const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

  //   return validatedGoalMetricsDTO;
  // }

  /**
   * Create GoalMetricsDTO
   */
  public static async createGoalMetricsDTO(goalMetricDTOWithoutUuid: GoalMetricDTOWithoutUuid): Promise<GoalMetricDTONew> {
    const docRef = doc(collection(db, PATH_TO_GOAL_METRICS_COLLECTION));

    const goalMetricsDTO: GoalMetricDTONew = {
      ...goalMetricDTOWithoutUuid,
      uuid: docRef.id,
    };

    // const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    await setDoc(docRef, goalMetricsDTO);

    return goalMetricsDTO;
  }

  /**
   * Update GoalMetricsDTO
   */
  // public static async updateGoalMetricsDTO(goalMetricsDTO: GoalMetricDTONew): Promise<void> {
  //   const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

  //   await updateDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsDTO.uuid), validatedGoalMetricsDTO);
  // }

}
