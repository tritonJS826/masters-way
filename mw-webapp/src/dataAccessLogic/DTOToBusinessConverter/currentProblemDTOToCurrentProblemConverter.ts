import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";

/**
 * Convert CurrentProblemDTO to CurrentProblem
 * @param currentProblemDTO: CurrentProblemDTO
 * @returns CurrentProblem
 */
export const currentProblemDTOToCurrentProblemConverter = (currentProblemDTO: CurrentProblemDTO) => {
  return new CurrentProblem(currentProblemDTO);
};


