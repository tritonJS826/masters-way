import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO, CurrentProblemDTOSchema} from "src/model/DTOModel/CurrentProblemDTO";

/**
 * Convert {@link CurrentProblem} to {@link CurrentProblemDTO}
 */
export const currentProblemToCurrentProblemDTOConverter = (currentProblem: CurrentProblem): CurrentProblemDTO => {
  const validatedCurrentProblem = CurrentProblemDTOSchema.parse(currentProblem);

  return validatedCurrentProblem;
};