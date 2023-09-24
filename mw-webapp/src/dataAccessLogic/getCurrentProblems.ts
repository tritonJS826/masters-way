import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblemService} from "src/service/CurrentProblemService";

export const getCurrentProblems = async () => {
  const currentProblemsDTO = await CurrentProblemService.getCurrentProblems();
  const currentProblems = currentProblemsDTO.map(currentProblemDTOToCurrentProblemConverter);

  return currentProblems;
};