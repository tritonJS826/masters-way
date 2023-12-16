import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetricDTO} from "src/model/DTOModel/GoalMetricDTO";

/**
 * Convert {@link GoalMetricDTO} to {@link GoalMetric}
 */
export const goalMetricDTOToGoalMetricConverter = (goalMetricDTO: GoalMetricDTO): GoalMetric => {
  return new GoalMetric({
    ...goalMetricDTO,
    doneDate: goalMetricDTO.doneDate.map((date) => date.toDate()),
  });
};
