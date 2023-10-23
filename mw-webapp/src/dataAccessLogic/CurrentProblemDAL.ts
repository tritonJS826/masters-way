import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTO} from "src/model/DTOModel/CurrentProblemDTO";
import {CurrentProblemDTOWithoutUuid, CurrentProblemService} from "src/service/CurrentProblemService";

/**
 * Provides methods to interact with the CurrentProblem business model
 */
export class CurrentProblemDAL {

  /**
   *Get CurrentProblems
   */
  public static async getCurrentProblems (): Promise<CurrentProblem[]> {
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
   * Create new CurrentProblem
   */
  public static async createNewCurrentProblem(): Promise<CurrentProblemDTO> {
    const currentProblemWithoutUuid: CurrentProblemDTOWithoutUuid = {
      description: "",
      isDone: false,
    };

    const newCurrentProblem = await CurrentProblemService.createCurrentProblemDTO(currentProblemWithoutUuid);

    return newCurrentProblem;
  }

  /**
   * Update CurrentProblem
   */
  public static async updateCurrentProblem (currentProblem: CurrentProblem) {
    const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(currentProblem);
    await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
  }

}