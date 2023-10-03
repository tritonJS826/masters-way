import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
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

/**
 * Problem for current period
 * @returns {Promise<CurrentProblem>}
 */
export const getCurrentProblem = async (uuid: string): Promise<CurrentProblem> => {
  const CurrentProblemDTO = await CurrentProblemService.getCurrentProblemDTO(uuid);
  const currentProblem = currentProblemDTOToCurrentProblemConverter(CurrentProblemDTO);

  return currentProblem;
};

/**
 * Update Problems for current period
 * @param {CurrentProblem} currentProblem
 */
export const updatesCurrentProblem = async (currentProblem: CurrentProblem) => {
  const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(currentProblem);
  await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
};