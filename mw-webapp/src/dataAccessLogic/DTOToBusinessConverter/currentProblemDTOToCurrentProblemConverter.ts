import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/DTOModel/CurrentProblemDTO";

/**
 * Convert {@link CurrentProblemDTO} to {@link CurrentProblem}
 */
export const currentProblemDTOToCurrentProblemConverter = (currentProblemDTO: CurrentProblemDTO): CurrentProblem => {
  return new CurrentProblem(currentProblemDTO);
};

