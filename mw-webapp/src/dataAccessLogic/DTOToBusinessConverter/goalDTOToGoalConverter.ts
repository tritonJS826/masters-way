import {Goal} from "src/model/businessModel/Goal";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {GoalDTO} from "src/model/DTOModel/GoalDTO";

/**
 * Convert {@link GoalDTO} to {@link Goal}
 */
export const goalDTOToGoalConverter = (goalDTO: GoalDTO, goalOwner: UserPreview): Goal => {
  return new Goal({
    ...goalDTO,
    student: goalOwner,
    metrics: goalDTO.metricsStringified.map((metricStringified) => {
      const metric = JSON.parse(metricStringified);
      metric.doneDate = new Date(metric.doneDate) ?? null;

      return metric;
    }),
  });
};

