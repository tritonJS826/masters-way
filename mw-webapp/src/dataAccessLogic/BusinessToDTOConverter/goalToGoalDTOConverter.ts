import {Goal} from "src/model/businessModel/Goal";
import {GoalDTO, GoalDTOSchema} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalDTO} to {@link Goal}
 */
export const goalToGoalDTOConverter = (goal: Goal): GoalDTO => {
  const goalDTO: GoalDTO = {
    uuid: goal.uuid,
    studentUuid: goal.student.uuid,
    metricUuids: goal.metrics.map((metric) => metric.uuid),
    description: goal.description,
    estimationTime: goal.estimationTime,
  };

  return GoalDTOSchema.parse(goalDTO);
};
