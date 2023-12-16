import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetricDTO, GoalMetricDTOSchema} from "src/model/DTOModel/GoalMetricDTO";

/**
 * Convert {@link GoalMetric} to {@link GoalMetricDTO}
 */
export const goalMetricToGoalMetricDTOConverter = (goalMetric: GoalMetric): GoalMetricDTO => {
  const validatedGoalMetricDTO = GoalMetricDTOSchema.parse(goalMetric);

  return validatedGoalMetricDTO;
};
