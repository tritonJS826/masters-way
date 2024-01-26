/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      case "student": {
        goalPartialDTO.studentUuid = goal[key]!.uuid;
        break;
      }
      case "metrics": {
        goalPartialDTO.metricUuids = goal[key]!.map((metric) => metric.uuid);
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
