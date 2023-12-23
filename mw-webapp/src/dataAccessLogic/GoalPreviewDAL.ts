import {goalDTOToGoalPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/goalDTOToGoalPreviewConverter";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {GoalService} from "src/service/GoalService";

/**
 * Provides methods to interact with the GoalPreview model
 */
export class GoalPreviewDAL {

  /**
   * Get GoalsPreview
   */
  public static async getGoalsPreview(): Promise<GoalPreview[]> {
    const goalsDTO = await GoalService.getGoalsDTO();
    const goalsPreview = goalsDTO.map(goalDTOToGoalPreviewConverter);

    return goalsPreview;
  }

  /**
   * Get GoalPreview
   */
  public static async getGoal(uuid: string): Promise<GoalPreview> {
    const goalDTO = await GoalService.getGoalDTO(uuid);
    const goalPreview = goalDTOToGoalPreviewConverter(goalDTO);

    return goalPreview;
  }

  /**
   * Update GoalPreview
   */
  public static async updateGoalPreview(goalDTO: GoalPreview): Promise<void> {
    await GoalService.updateGoalDTO(goalDTO);
  }

}
