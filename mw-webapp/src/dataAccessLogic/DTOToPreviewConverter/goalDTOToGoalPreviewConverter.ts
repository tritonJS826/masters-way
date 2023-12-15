import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalDTO} to {@link GoalPreview}
 */
export const goalDTOToGoalPreviewConverter = (goalDTO: GoalDTO): GoalPreview => {
  return new GoalPreview(goalDTO);
};
