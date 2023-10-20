import {goalDTOToGoalPreviewConverter} from "src/dataAccessLogic/DTOToPreviewConverter/goalDTOToGoalPreviewConverter";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {TimeUnit} from "src/model/businessModelPreview/time/timeUnit/TimeUnit";
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
   * Create GoalPreview
   * @return {string} Uuid of new Goal
   */
  public static async createGoalPreview(): Promise<string> {
    const goalPreviewWithoutUuid: GoalDTOWithoutUuid = {
      studentUuid: "",
      metricUuids: [""],
      description: "",
      estimationTime: 0,
      timeUnit: TimeUnit.minute,
    };

    const newJobDoneUuid = await GoalService.createGoalDTO(goalPreviewWithoutUuid);

    return newJobDoneUuid;
  }

}