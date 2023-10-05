import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemService} from "src/service/CurrentProblemService";

/**
 * Provides methods to interact with the CurrentProblem business model
 */
export class CurrentProblemDAL {

  /**
   * Problems for current period
   * @returns {Promise<CurrentProblem[]>}
   */
  public static async getCurrentProblems (): Promise<CurrentProblem[]> {
    const currentProblemsDTO = await CurrentProblemService.getCurrentProblemsDTO();
    const currentProblems = currentProblemsDTO.map(currentProblemDTOToCurrentProblemConverter);

    return currentProblems;
  }

  /**
   * Problem for current period
   * @returns {Promise<CurrentProblem>}
   */
  public static async getCurrentProblem (uuid: string): Promise<CurrentProblem> {
    const CurrentProblemDTO = await CurrentProblemService.getCurrentProblemDTO(uuid);
    const currentProblem = currentProblemDTOToCurrentProblemConverter(CurrentProblemDTO);

    return currentProblem;
  }

  /**
   * Update Problems for current period
   * @param {CurrentProblem} currentProblem
   */
  public static async updateCurrentProblem (currentProblem: CurrentProblem) {
    const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(currentProblem);
    await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
  }

}