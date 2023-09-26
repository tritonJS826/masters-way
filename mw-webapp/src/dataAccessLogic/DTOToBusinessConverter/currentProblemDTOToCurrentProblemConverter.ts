import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";

/**
 * Convert CurrentProblemDTO to CurrentProblem
 * @param {CurrentProblemDTO} currentProblemDTO
 * @returns {CurrentProblem}
 */
export const currentProblemDTOToCurrentProblemConverter = (currentProblemDTO: CurrentProblemDTO): CurrentProblem => {
  return new CurrentProblem(currentProblemDTO);
};


