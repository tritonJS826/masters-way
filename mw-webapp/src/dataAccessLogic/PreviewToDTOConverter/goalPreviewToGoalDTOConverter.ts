import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalPreview} to {@link GoalDTO}
 */
export const goalPreviewToGoalDTOConverter = (goalPreview: GoalPreview): GoalDTO => {
  return new GoalDTO({...goalPreview});
};