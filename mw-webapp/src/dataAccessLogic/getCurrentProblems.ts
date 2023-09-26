import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemService} from "src/service/CurrentProblemService";

/**
 * Problems for current period
 * @returns {Promise<CurrentProblem[]>}
 */
export const getCurrentProblems = async (): Promise<CurrentProblem[]> => {
  const currentProblemsDTO = await CurrentProblemService.getCurrentProblemsDTO();
  const currentProblems = currentProblemsDTO.map(currentProblemDTOToCurrentProblemConverter);

  return currentProblems;
};