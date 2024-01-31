import {writeBatch} from "firebase/firestore";
import {goalToGoalDTOPartialConverter} from "src/dataAccessLogic/BusinessToDTOConverter/goalToGoalDTOPartialConverter";
import {goalDTOToGoalConverter} from "src/dataAccessLogic/DTOToBusinessConverter/goalDTOToGoalConverter";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {db} from "src/firebase";
import {Goal} from "src/model/businessModel/Goal";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {GoalDTOWithoutUuid, GoalService} from "src/service/GoalService";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Provides methods to interact with the Goal model
 */
export class GoalDAL {

  /**
   * Get Goal
   */
  public static async getGoal(goalUuid: string, goalOwner: UserPreview): Promise<Goal> {
    const goalDTO = await GoalService.getGoalDTO(goalUuid);
    const goal = goalDTOToGoalConverter(goalDTO, goalOwner);

    return goal;
  }

  /**
   * Create Goal
   */
  public static async createGoal(ownerUuid: string): Promise<Goal> {
    const batch = writeBatch(db);

    const goalWithoutUuid: GoalDTOWithoutUuid = {
      studentUuid: ownerUuid,
      metricsStringified: [],
      description: "",
      estimationTime: 0,
    };

    const newGoalDTO = GoalService.createGoalDTOWithBatch(goalWithoutUuid, batch);

    await batch.commit();

    const goalOwner = await UserPreviewDAL.getUserPreview(ownerUuid);
    const goal = goalDTOToGoalConverter(newGoalDTO, goalOwner);

    return goal;
  }

  /**
   * Update Goal
   */
  public static async updateGoal(goalPartial: PartialWithUuid<Goal>): Promise<void> {
    const goalPartialDTO = goalToGoalDTOPartialConverter(goalPartial);
    await GoalService.updateGoalDTO(goalPartialDTO);
  }

}
