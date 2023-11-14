import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {CurrentProblemDTOWithoutUuid, CurrentProblemService} from "src/service/CurrentProblemService";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the CurrentProblem business model
 */
export class CurrentProblemDAL {

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
  public static async createCurrentProblem(dayReportUuid: string): Promise<CurrentProblem> {
    const currentProblemWithoutUuid: CurrentProblemDTOWithoutUuid = {
      description: UnicodeSymbols.ZERO_WIDTH_SPACE,
      isDone: false,
    };

    const newCurrentProblem = await CurrentProblemService.createCurrentProblemDTO(currentProblemWithoutUuid);

    const currentProblem = currentProblemDTOToCurrentProblemConverter(newCurrentProblem);
    const updatedDayReport = await DayReportDAL.getDayReport(dayReportUuid);
    const updatedCurrentProblem = [...updatedDayReport.problemsForCurrentPeriod, currentProblem];
    const dayReportUpdated = {...updatedDayReport, problemsForCurrentPeriod: updatedCurrentProblem};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    return currentProblem;
  }

  /**
   * Update CurrentProblem
   */
  public static async updateCurrentProblem(currentProblem: CurrentProblem, description: string) {
    const updatedCurrentProblem = new CurrentProblem({
      ...currentProblem,
      description,
    });
    const currentProblemDTO = currentProblemToCurrentProblemDTOConverter(updatedCurrentProblem);
    await CurrentProblemService.updateCurrentProblemDTO(currentProblemDTO, currentProblem.uuid);
  }

}