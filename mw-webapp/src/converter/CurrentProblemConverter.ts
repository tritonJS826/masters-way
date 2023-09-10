import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblem as CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblem";

export const CurrentProblemDTOToCurrentProblemConverter = (currentProblemRaw: CurrentProblemDTO) => {
  return new CurrentProblem({...currentProblemRaw});
};


