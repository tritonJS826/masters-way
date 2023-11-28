import {goalDTOToGoalPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/goalDTOToGoalPreviewConverter";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {TimeUnit} from "src/model/businessModelPreview/time/timeUnit/TimeUnit";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";
import {GoalDTOWithoutUuid, GoalService} from "src/service/GoalService";

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
  public static async getGoalPreview(uuid: string): Promise<GoalPreview> {
    const goalDTO = await GoalService.getGoalDTO(uuid);
    const goalPreview = goalDTOToGoalPreviewConverter(goalDTO);

    return goalPreview;
  }

  /**
   * Create GoalPreview
   */
  public static async createGoalPreview(): Promise<GoalDTO> {
    const goalPreviewWithoutUuid: GoalDTOWithoutUuid = {
      studentUuid: "",
      metricUuids: [""],
      description: "",
      estimationTime: 0,
      timeUnit: TimeUnit.minute,
    };

    const newGoalPreview = await GoalService.createGoalDTO(goalPreviewWithoutUuid);

    return newGoalPreview;
  }

  /**
   * Update GoalPreview
   */
  public static async updateGoalPreview(goalDTO: GoalPreview): Promise<void> {
    await GoalService.updateGoalDTO(goalDTO, goalDTO.uuid);
  }

}
