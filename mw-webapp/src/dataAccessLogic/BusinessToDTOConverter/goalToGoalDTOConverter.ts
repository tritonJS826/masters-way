import {Goal} from "src/model/businessModel/Goal";
import {GoalDTO, GoalDTOSchema} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalDTO} to {@link Goal}
 */
export const goalToGoalDTOConverter = (goal: Goal): GoalDTO => {
  const goalDTO: GoalDTO = {
    uuid: goal.uuid,
    studentUuid: goal.student.uuid,
    description: goal.description,
    estimationTime: goal.estimationTime,
    metricsStringified: goal.metrics.map((goalMetric) => JSON.stringify(goalMetric)),
  };

  return GoalDTOSchema.parse(goalDTO);
};
