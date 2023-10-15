import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
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
  public static async getCurrentProblem (uuid: string): Promise<CurrentProblem> {
    const CurrentProblemDTO = await CurrentProblemService.getCurrentProblemDTO(uuid);
    const currentProblem = currentProblemDTOToCurrentProblemConverter(CurrentProblemDTO);

    return currentProblem;
  }

  /**
   * Create new CurrentProblem
   * @return {string} Uuid of new CurrentProblem
   */
  public static async createNewCurrentProblem(): Promise<string> {
    const currentProblemWithoutUuid: CurrentProblemDTOWithoutUuid = {
      description: "",
      isDone: false,
    };

    const newCurrentProblemUuid = await CurrentProblemService.createCurrentProblemDTO(currentProblemWithoutUuid);

    return newCurrentProblemUuid;
  }

  /**
   * Update CurrentProblem
   */
  public static async updateCurrentProblem (currentProblem: CurrentProblem) {
    const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(currentProblem);
    await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
  }

}