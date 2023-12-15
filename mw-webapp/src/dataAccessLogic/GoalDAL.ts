import {goalToGoalDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/goalToGoalDTOConverter";
import {goalDTOToGoalConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalDTOToGoalConverter";
import {goalMetricDTOToGoalMetricConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalMetricDTOToGoalMetricConverter";
import {Goal} from "src/model/businessModel/Goal";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";
import {GoalMetricDTOWithoutUuid, GoalMetricService} from "src/service/GoalMetricService";
import {GoalDTOWithoutUuid, GoalService} from "src/service/GoalService";

/**
 * Provides methods to interact with the Goal model
 */
export class GoalDAL {

  /**
   * Get Goal
   */
  public static async getGoal(goalUuid: string, goalOwner: UserPreview): Promise<Goal> {
    const goalDTO = await GoalService.getGoalDTO(goalUuid);
    const goalMetricDTO = await GoalMetricService.getGoalMetricsDTO(goalUuid);

    const goalMetric = goalMetricDTOToGoalMetricConverter(goalMetricDTO);
    const goal = goalDTOToGoalConverter(goalDTO, goalOwner, goalMetric);

    return goal;
  }

  /**
   * Create Goal
   */
  public static async createGoal(ownerUuid: string): Promise<GoalDTO> {
    const goalMetricWithoutUuid: GoalMetricDTOWithoutUuid = {
      metricUuids: [],
      description: [],
      isDone: [],
      doneDate: [],
    };

    const newGoalMetric = await GoalMetricService.createGoalMetricsDTO(goalMetricWithoutUuid);

    const goalWithoutUuid: GoalDTOWithoutUuid = {
      studentUuid: ownerUuid,
      metricUuids: [newGoalMetric.uuid],
      description: "",
      estimationTime: 0,
    };

    const newGoal = await GoalService.createGoalDTO(goalWithoutUuid);

    return newGoal;
  }

  /**
   * Update Goal
   */
  public static async updateGoal(goal: Goal): Promise<void> {
    const goalDTO: GoalDTO = goalToGoalDTOConverter(goal);
    await GoalService.updateGoalDTO(goalDTO);
  }

}
