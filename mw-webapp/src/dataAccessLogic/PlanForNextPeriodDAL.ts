import {planForNextPeriodToPlanForNextPeriodDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/planForNextPeriodToPlanForNextPeriodDTOConverter";
import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTOWithoutUuid, PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

/**
 * Provides methods to interact with the PlanForNextPeriod business model
 */
export class PlanForNextPeriodDAL {

  /**
   * Get PLansForNextPeriod
   */
  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriod[]> {
    const plansForNextPeriodDTO = await PlanForNextPeriodService.getPlansForNextPeriodDTO();
    const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);

    return plansForNextPeriod;
  }

  /**
   * Get PlanForNextPeriod by uuid
   */
  public static async getPlanForNextPeriod(uuid: string): Promise<PlanForNextPeriod> {
    const PlaForNextPeriodDTO = await PlanForNextPeriodService.getPlanForNextPeriodDTO(uuid);
    const planForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodConverter(PlaForNextPeriodDTO);

    return planForNextPeriod;
  }

  /**
   * Create new PlanForNextPeriod
   * @return {string} Uuid of new PlanForNextPeriod
   */
  public static async createNewPlanForNextPeriod(): Promise<string> {
    const planForNextPeriodWithoutUuid: PlanForNextPeriodDTOWithoutUuid = {
      job: "",
      estimationTime: 0,
      timeUnit: TimeUnit.minute,
    };

    const newPlanForNextPeriodUuid = await PlanForNextPeriodService.createPlanForNextPeriodDTO(planForNextPeriodWithoutUuid);

    return newPlanForNextPeriodUuid;
  }

  /**
   * Update PlanForNextPeriod
   */
  public static async updatePlanForNextPeriod(planForNextPeriod: PlanForNextPeriod) {
    const planForNextPeriodDTO = planForNextPeriodToPlanForNextPeriodDTOConverter(planForNextPeriod);
    await PlanForNextPeriodService.updatePLanForNextPeriodDTO(planForNextPeriodDTO, planForNextPeriod.uuid);
  }

}