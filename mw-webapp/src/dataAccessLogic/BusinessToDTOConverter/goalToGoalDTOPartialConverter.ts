import {showError} from "src/dataAccessLogic/BusinessToDTOConverter/showError";
import {Goal} from "src/model/businessModel/Goal";
import {GoalDTO, GoalPartialDTOSchema} from "src/model/DTOModel/GoalDTO";
import {PartialWithUuid} from "src/utils/PartialWithUuid";

/**
 * Convert {@link goal} to {@link GoalPartialDTO}
 */
export const goalToGoalDTOPartialConverter = (goal: PartialWithUuid<Goal>): PartialWithUuid<GoalDTO> => {
  const goalPartialDTO: PartialWithUuid<GoalDTO> = {uuid: goal.uuid};

  for (const key in goal) {
    switch (key) {
      case "metrics": {
        goalPartialDTO.metricUuids = goal.metrics ? goal.metrics.map((metric) => metric.uuid) : showError(key);
        break;
      }
      case "description": {
        goalPartialDTO[key] = goal[key];
        break;
      }
      case "estimationTime": {
        goalPartialDTO[key] = goal[key];
        break;
      }
    }
  }

  const validatedGoalPartialDTO = GoalPartialDTOSchema.parse(goalPartialDTO);

  return validatedGoalPartialDTO;
};
