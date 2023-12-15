import {goalMetricToGoalMetricDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/goalMetricToGoalMetricDTOConverter";
import {goalMetricDTOToGoalMetricConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalMetricDTOToGoalMetricConverter";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetricDTO} from "src/model/DTOModel/GoalMetricDTO";
import {GoalMetricDTOWithoutUuid, GoalMetricService} from "src/service/GoalMetricService";

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
   * Create GoalMetric
   */
  public static async createGoalMetric(): Promise<GoalMetricDTO> {
    const goalMetricWithoutUuid: GoalMetricDTOWithoutUuid = {
      metricUuids: [],
      description: [],
      isDone: [],
      doneDate: [],
    };

    const newGoalMetric = await GoalMetricService.createGoalMetricsDTO(goalMetricWithoutUuid);

    return newGoalMetric;
  }

  /**
   * Update GoalMetric
   */
  public static async updateGoalMetric(goalMetric: GoalMetric): Promise<void> {
    const goalMetricDTO = goalMetricToGoalMetricDTOConverter(goalMetric);
    await GoalMetricService.updateGoalMetricsDTO(goalMetricDTO);
  }

}
