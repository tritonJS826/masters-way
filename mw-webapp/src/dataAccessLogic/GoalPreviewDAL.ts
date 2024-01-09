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

    return goalsDTO.map(goalDTOToGoalPreviewConverter);
  }

  /**
   * Get GoalsPreview by uuids
   */
  public static async getGoalsPreviewByUuids(goalUuids: string[]): Promise<GoalPreview[]> {
    const goalDTO = goalUuids.length !== 0 ? await GoalService.getGoalsDTOByUuids(goalUuids) : [];

    return goalDTO.map(goalDTOToGoalPreviewConverter);
  }

  /**
   * Get GoalPreview
   */
  public static async getGoal(uuid: string): Promise<GoalPreview> {
    const goalDTO = await GoalService.getGoalDTO(uuid);

    return goalDTOToGoalPreviewConverter(goalDTO);
  }

  /**
   * Update GoalPreview
   */
  public static async updateGoalPreview(goalDTO: GoalPreview): Promise<void> {
    await GoalService.updateGoalDTO(goalDTO);
  }

}
