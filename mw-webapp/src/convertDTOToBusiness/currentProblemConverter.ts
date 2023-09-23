import {querySnapshotToDTOConverter} from "src/convertDTOToBusiness/querySnapshotToDTOConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemPreview} from "src/model/businessModelPreview/CurrentProblemPreview";
import {CurrentProblemDTO} from "src/model/firebaseCollection/CurrentProblemDTO";
import {querySnapshot} from "src/model/querySnapshot";

export const currentProblemDTOToCurrentProblemPreviewConverter = (currentProblemsRaw: querySnapshot) => {
  const currentProblemsDTO: CurrentProblemDTO[] = querySnapshotToDTOConverter<CurrentProblemDTO>(currentProblemsRaw);
  const currentProblemsPreview: CurrentProblemPreview[] = currentProblemsDTO.map((currentProblemDTO: CurrentProblemDTO) => {
    return new CurrentProblem({...currentProblemDTO});
  });

  return currentProblemsPreview;
};


