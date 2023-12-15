import {writeBatch} from "firebase/firestore";
import {currentProblemToCurrentProblemDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/currentProblemToCurrentProblemDTOConverter";
import {dayReportToDayReportDTOConverter} from "src/dataAccessLogic/BusinessToDTOConverter/dayReportToDayReportDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {currentProblemDTOToCurrentProblemConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/currentProblemDTOToCurrentProblemConverter";
import {db} from "src/firebase";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {DayReport} from "src/model/businessModel/DayReport";
import {CurrentProblemDTOWithoutUuid, CurrentProblemService} from "src/service/CurrentProblemService";
import {DayReportService} from "src/service/DayReportService";

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
  public static async createCurrentProblem(dayReport: DayReport, ownerUuid: string): Promise<CurrentProblem> {
    const currentProblemWithoutUuid: CurrentProblemDTOWithoutUuid = {
      description: "",
      isDone: false,
      ownerUuid,
      tags: [],
    };

    const newCurrentProblem = await CurrentProblemService.createCurrentProblemDTO(currentProblemWithoutUuid);

    const currentProblem = currentProblemDTOToCurrentProblemConverter(newCurrentProblem);
    const updatedCurrentProblem = [...dayReport.problemsForCurrentPeriod, currentProblem];
    const dayReportUpdated = {...dayReport, problemsForCurrentPeriod: updatedCurrentProblem};
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

  /**
   * Delete CurrentProblem by uuid
   */
  public static async deleteCurrentProblem(currentProblemUuid: string, dayReport: DayReport) {
    const jobDoneUuids = dayReport.jobsDone.map((item) => item.uuid);
    const planForNextPeriodUuids = dayReport.plansForNextPeriod.map((item) => item.uuid);
    const problemForCurrentPeriodUuids = dayReport.problemsForCurrentPeriod.map((item) => item.uuid);
    const commentUuids = dayReport.comments.map((item) => item.uuid);

    const dayReportDTOProps = {
      jobDoneUuids,
      planForNextPeriodUuids,
      problemForCurrentPeriodUuids,
      commentUuids,
    };
    const dayReportDTO = dayReportToDayReportDTOConverter(dayReport, dayReportDTOProps);
    const batch = writeBatch(db);
    CurrentProblemService.deleteCurrentProblemDTOWithBatch(currentProblemUuid, batch);
    DayReportService.updateDayReportDTOWithBatch(dayReport.uuid, dayReportDTO, batch);
    await batch.commit();
  }

}
