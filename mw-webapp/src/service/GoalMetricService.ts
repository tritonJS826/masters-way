import {collection, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalMetricDTO, GoalMetricDTOSchema} from "src/model/DTOModel/GoalMetricDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";

const PATH_TO_GOAL_METRICS_COLLECTION = "goalMetrics";

/**
 * GoalMetricDTO props without uuid
 */
export type GoalMetricDTOWithoutUuid = Omit<GoalMetricDTO, "uuid">;

/**
 * Provides methods to interact with the @goalMetrics collection
 */
export class GoalMetricService {

  /**
   * Get GoalDTO
   */
  public static async getGoalMetricsDTO(metricUuid: string): Promise<GoalMetricDTO> {
    const goalMetricsRaw = await getDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, metricUuid));
    const goalMetricsDTO = documentSnapshotToDTOConverter<GoalMetricDTO>(goalMetricsRaw);

    const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    return validatedGoalMetricsDTO;
  }

  /**
   * Create GoalMetricsDTO
   */
  public static async createGoalMetricsDTO(goalMetricDTOWithoutUuid: GoalMetricDTOWithoutUuid): Promise<GoalMetricDTO> {
    const docRef = doc(collection(db, PATH_TO_GOAL_METRICS_COLLECTION));

    const goalMetricsDTO: GoalMetricDTO = {
      ...goalMetricDTOWithoutUuid,
      uuid: docRef.id,
    };

    const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    await setDoc(docRef, validatedGoalMetricsDTO);

    return validatedGoalMetricsDTO;
  }

  /**
   * Update GoalMetricsDTO
   */
  public static async updateGoalMetricsDTO(goalMetricsDTO: GoalMetricDTO): Promise<void> {
    const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    await updateDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsDTO.uuid), validatedGoalMetricsDTO);
  }

}
