import {Goal} from "src/model/businessModel/Goal";
import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalDTO} to {@link Goal}
 */
export const goalDTOToGoalConverter = (goalDTO: GoalDTO, goalOwner: UserPreview, goalMetric: GoalMetric): Goal => {
  return new Goal({
    ...goalDTO,
    student: goalOwner,
    metrics: [goalMetric],
  });
};

