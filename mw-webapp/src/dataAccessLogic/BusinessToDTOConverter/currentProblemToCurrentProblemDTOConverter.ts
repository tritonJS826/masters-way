import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";

/**
 * Convert {@link CurrentProblem} to {@link CurrentProblemDTO}
 */
export const currentProblemToCurrentProblemDTOConverter = (currentProblem: CurrentProblem): CurrentProblemDTO => {
  return new CurrentProblemDTO(currentProblem);
};