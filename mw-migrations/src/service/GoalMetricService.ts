import {collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase.js";
import { GoalMetricBackup, GoalMetricDTONew } from "../DTOModel/GoalMetricDTO.js";
import { querySnapshotToDTOConverter } from "../converter/querySnapshotToDTOConverter.js";
import { Timestamp } from "firebase/firestore";
import { truncateToThreeChars } from "../utils/truncateToThreeChars.js";

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
   * For import purposes
   */
  public static async importGoalMetrics(goalMetrics: GoalMetricBackup): Promise<GoalMetricBackup> {
    const doneDate = goalMetrics.doneDate.map(doneDate => Timestamp.fromDate(new Date(Number(`${doneDate.seconds}${truncateToThreeChars(doneDate.nanoseconds)}`))));

    const goalMetricsToImport = {
      ...goalMetrics,
      doneDate: doneDate,
    };

    await setDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetrics.uuid), goalMetricsToImport);
  
    return goalMetrics;
  }

  /**
   * Delete GoalMetricsDTO
   */
  public static async deleteGoalMetricsDTO(goalMetricsUuid: string) {
    deleteDoc(doc(db, PATH_TO_GOAL_METRICS_COLLECTION, goalMetricsUuid));
  }

}
