import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";

export const currentProblemDTOToCurrentProblemConverter = (currentProblemDTO: CurrentProblemDTO) => {
  return new CurrentProblem(currentProblemDTO);
};


