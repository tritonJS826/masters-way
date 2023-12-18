import {writeBatch} from "firebase/firestore";
import {goalToGoalDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/goalToGoalDTOConverter";
import {goalDTOToGoalConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalDTOToGoalConverter";
import {goalMetricDTOToGoalMetricConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalMetricDTOToGoalMetricConverter";
import {GoalMetricDAL} from "src/dataAccessLogic/GoalMetricDAL";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {db} from "src/firebase";
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
    const goalMetricDTO = await GoalMetricService.getGoalMetricsDTO(goalDTO.metricUuids[0]);

    const goalMetric = goalMetricDTOToGoalMetricConverter(goalMetricDTO);
    const goal = goalDTOToGoalConverter(goalDTO, goalOwner, goalMetric);

    return goal;
  }

  /**
   * Create Goal
   */
  public static async createGoal(ownerUuid: string): Promise<Goal> {
    const batch = writeBatch(db);

    const goalMetricWithoutUuid: GoalMetricDTOWithoutUuid = {
      metricUuids: [],
      description: [],
      isDone: [],
      doneDate: [],
    };

    const newGoalMetric = await GoalMetricService.createGoalMetricsDTOWithBatch(goalMetricWithoutUuid, batch);

    const goalWithoutUuid: GoalDTOWithoutUuid = {
      studentUuid: ownerUuid,
      metricUuids: [newGoalMetric.uuid],
      description: "",
      estimationTime: 0,
    };

    const newGoalDTO = await GoalService.createGoalDTOWithBatch(goalWithoutUuid, batch);

    await batch.commit();

    const goalOwner = await UserPreviewDAL.getUserPreview(ownerUuid);
    const goalMetric = await GoalMetricDAL.getGoalsMetric(newGoalMetric.uuid);
    const goal = goalDTOToGoalConverter(newGoalDTO, goalOwner, goalMetric);

    return goal;
  }

  /**
   * Update Goal
   */
  public static async updateGoal(goal: Goal): Promise<void> {
    const goalDTO: GoalDTO = goalToGoalDTOConverter(goal);
    await GoalService.updateGoalDTO(goalDTO);
  }

}
