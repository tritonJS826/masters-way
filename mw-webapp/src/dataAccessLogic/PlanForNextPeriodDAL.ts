import {planForNextPeriodToPlanForNextPeriodDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/planForNextPeriodToPlanForNextPeriodDTOConverter";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {DayReport} from "src/model/businessModel/DayReport";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTOWithoutUuid, PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";
import {UnicodeSymbols} from "src/utils/UnicodeSymbols";

/**
 * Provides methods to interact with the PlanForNextPeriod business model
 */
export class PlanForNextPeriodDAL {

  /**
   * Get PlanForNextPeriod by uuid
   */
  public static async getPlanForNextPeriod(uuid: string): Promise<PlanForNextPeriod> {
    const PlaForNextPeriodDTO = await PlanForNextPeriodService.getPlanForNextPeriodDTO(uuid);
    const planForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodConverter(PlaForNextPeriodDTO);

    return planForNextPeriod;
  }

  /**
   * Create PlanForNextPeriod
   */
  public static async createPlanForNextPeriod(dayReport: DayReport): Promise<PlanForNextPeriod> {
    const planForNextPeriodWithoutUuid: PlanForNextPeriodDTOWithoutUuid = {
      job: UnicodeSymbols.ZERO_WIDTH_SPACE,
      estimationTime: 0,
      timeUnit: TimeUnit.minute,
    };

    const newPlanForNextPeriod = await PlanForNextPeriodService.createPlanForNextPeriodDTO(planForNextPeriodWithoutUuid);

    const planForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodConverter(newPlanForNextPeriod);
    const updatedPlansForNextPeriod = [...dayReport.plansForNextPeriod, planForNextPeriod];
    const dayReportUpdated = {...dayReport, plansForNextPeriod: updatedPlansForNextPeriod};
    await DayReportDAL.updateDayReport(dayReportUpdated);

    return planForNextPeriod;
  }

  /**
   * Update PlanForNextPeriod
   */
  public static async updatePlanForNextPeriod(planForNextPeriod: PlanForNextPeriod, job: string) {
    const updatedPlansForNextPeriod = new PlanForNextPeriod({
      ...planForNextPeriod,
      job,
    });
    const planForNextPeriodDTO = planForNextPeriodToPlanForNextPeriodDTOConverter(updatedPlansForNextPeriod);
    await PlanForNextPeriodService.updatePLanForNextPeriodDTO(planForNextPeriodDTO, planForNextPeriod.uuid);
  }

  /**
   * Update PlanForNextPeriodTime
   */
  public static async updatePlanForNextPeriodTime(planForNextPeriod: PlanForNextPeriod, estimationTime: number) {
    const updatedPlansForNextPeriod = new PlanForNextPeriod({
      ...planForNextPeriod,
      estimationTime,
    });
    const planForNextPeriodDTO = planForNextPeriodToPlanForNextPeriodDTOConverter(updatedPlansForNextPeriod);
    await PlanForNextPeriodService.updatePLanForNextPeriodDTO(planForNextPeriodDTO, planForNextPeriod.uuid);
  }

}