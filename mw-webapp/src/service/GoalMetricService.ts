import {ref, get} from "firebase/database";
import {GoalMetricDTOToGoalMetricConverter} from "src/converter/GoalMetricConverter";
import {db} from "src/firebase";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetric as GoalMetricDTO} from "src/model/firebaseCollection/GoalMetric";

export class GoalMetricService {

  public static async getValueFromRealTimeDb(): Promise<GoalMetric[]> {
    const snapshot = await get(ref(db, "/goalMetrics"));
    const goalMetricsRaw: GoalMetricDTO[] = await snapshot.val();
    const goalMetrics: GoalMetric[] = goalMetricsRaw.map((item) => GoalMetricDTOToGoalMetricConverter(item));
    return goalMetrics;
  }

}