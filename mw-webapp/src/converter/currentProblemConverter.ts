import {querySnapshot} from "src/converter/querySnapshot";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblem as CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblem";

export const querySnapshotToCurrentProblemDTOConverter = (currentProblemsRaw: querySnapshot) => {
  const currentProblemsDTO: CurrentProblemDTO[] = currentProblemsRaw.docs.map((currentProblemRaw) => ({
    uuid: currentProblemRaw.data().uuid,
    description: currentProblemRaw.data().description,
    isDone: currentProblemRaw.data().isDone,
  }));
  return currentProblemsDTO;
};

export const currentProblemDTOToCurrentProblemConverter = (currentProblemRaw: CurrentProblemDTO) => {
  return new CurrentProblem({...currentProblemRaw});
};


