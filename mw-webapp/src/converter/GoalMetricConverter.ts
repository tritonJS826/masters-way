import {GoalMetric} from "src/model/businessModel/GoalMetric";
import {GoalMetric as GoalMetricDTO} from "src/model/firebaseCollection/GoalMetric";

export const GoalMetricDTOToGoalMetricConverter = (goalMetricRaw: GoalMetricDTO) => {
  return new GoalMetric({...goalMetricRaw});
};

