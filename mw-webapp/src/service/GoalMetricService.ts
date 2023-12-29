import {collection, doc, getDoc, setDoc, updateDoc, WriteBatch} from "firebase/firestore";
import {db} from "src/firebase";
import {GoalMetricDTO, GoalMetricDTOSchema} from "src/model/DTOModel/GoalMetricDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {logToConsole} from "src/utils/logToConsole";
import {RequestOperations} from "src/utils/RequestOperations";

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

    logToConsole(`GoalMetricService: getGoalMetricsDTO: 1 ${RequestOperations.READ} operation`);

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

    logToConsole(`GoalMetricService: createGoalMetricsDTO: 1 ${RequestOperations.WRITE} operation`);

    return validatedGoalMetricsDTO;
  }

  /**
   * Update GoalMetricsDTO
   */
  public static async updateGoalMetricsDTO(goalMetricsDTO: GoalMetricDTO): Promise<void> {
    const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    await updateDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsDTO.uuid), validatedGoalMetricsDTO);

    logToConsole(`GoalMetricService: updateGoalMetricsDTO: 1 ${RequestOperations.WRITE} operation`);
  }

  /**
   * Create GoalMetricsDTO with Batch
   */
  public static createGoalMetricsDTOWithBatch(
    goalMetricDTOWithoutUuid: GoalMetricDTOWithoutUuid,
    batch: WriteBatch): GoalMetricDTO {
    const docRef = doc(collection(db, PATH_TO_GOAL_METRICS_COLLECTION));

    const goalMetricsDTO: GoalMetricDTO = {
      ...goalMetricDTOWithoutUuid,
      uuid: docRef.id,
    };

    batch.set(docRef, goalMetricsDTO);

    const validatedGoalMetricsDTO = GoalMetricDTOSchema.parse(goalMetricsDTO);

    logToConsole(`GoalMetricService: createGoalMetricsDTOWithBatch: 1 ${RequestOperations.WRITE} operation`);

    return validatedGoalMetricsDTO;
  }

  /**
   * Delete GoalMetricsDTO with batch
   */
  public static async deleteGoalMetricsDTOWithBatch(goalMetricsDTOUuid: string, batch: WriteBatch) {
    const wayRef = doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsDTOUuid);
    batch.delete(wayRef);

    logToConsole(`GoalMetricService: deleteGoalMetricsDTOWithBatch: 1 ${RequestOperations.DELETE} operation`);
  }

}
