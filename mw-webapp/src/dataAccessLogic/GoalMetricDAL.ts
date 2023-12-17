import {goalMetricToGoalMetricDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/goalMetricToGoalMetricDTOConverter";
import {goalMetricDTOToGoalMetricConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalMetricDTOToGoalMetricConverter";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetricService} from "src/service/GoalMetricService";

/**
 * Provides methods to interact with the GoalMetric model
 */
export class GoalMetricDAL {

  /**
   * Get GoalMetric
   */
  public static async getGoalsMetric(gaolMetricUuid: string): Promise<GoalMetric> {
    const goalMetricDTO = await GoalMetricService.getGoalMetricsDTO(gaolMetricUuid);
    const goalMetric = goalMetricDTOToGoalMetricConverter(goalMetricDTO);

    return goalMetric;
  }

  /**
   * Update GoalMetric
   */
  public static async updateGoalMetric(goalMetric: GoalMetric): Promise<void> {
    const goalMetricDTO = goalMetricToGoalMetricDTOConverter(goalMetric);
    await GoalMetricService.updateGoalMetricsDTO(goalMetricDTO);
  }

}
