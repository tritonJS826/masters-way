import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTOWithoutUuid, CurrentProblemService} from "src/service/CurrentProblemService";
import {SPACE} from "src/utils/unicodeSymbols";

/**
 * Provides methods to interact with the CurrentProblem business model
 */
export class CurrentProblemDAL {

  /**
   * Get CurrentProblems
   */
  public static async getCurrentProblems(): Promise<CurrentProblem[]> {
    const currentProblemsDTO = await CurrentProblemService.getCurrentProblemsDTO();
    const currentProblems = currentProblemsDTO.map(currentProblemDTOToCurrentProblemConverter);

    return currentProblems;
  }

  /**
   * Get CurrentProblem by uuid
   */
  public static async getCurrentProblem(uuid: string): Promise<CurrentProblem> {
    const currentProblemDTO = await CurrentProblemService.getCurrentProblemDTO(uuid);
    const currentProblem = currentProblemDTOToCurrentProblemConverter(currentProblemDTO);

    return currentProblem;
  }

  /**
   * Create CurrentProblem
   */
  public static async createCurrentProblem(): Promise<CurrentProblem> {
    const currentProblemWithoutUuid: CurrentProblemDTOWithoutUuid = {
      description: SPACE,
      isDone: false,
    };

    const newCurrentProblem = await CurrentProblemService.createCurrentProblemDTO(currentProblemWithoutUuid);

    const currentProblem = currentProblemDTOToCurrentProblemConverter(newCurrentProblem);

    return currentProblem;
  }

  /**
   * Update CurrentProblem
   */
  public static async updateCurrentProblem (currentProblem: CurrentProblem) {
    const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(currentProblem);
    await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
  }

}