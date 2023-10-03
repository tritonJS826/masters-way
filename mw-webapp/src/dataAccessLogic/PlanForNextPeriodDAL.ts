import {planForNextPeriodToPlanForNextPeriodDTOConverter} from
  "src/dataAccessLogic/BusinessToDTOConverter/planForNextPeriodToPlanForNextPeriodDTOConverter";
import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

/**
 * Provides methods to interact with the JobDone business model
 */
export class PlanForNextPeriodDAL {

  /**
 * Plans for next period
 * @returns {Promise<PlanForNextPeriod[]>}
 */
  public static async getPlansForNextPeriod(): Promise<PlanForNextPeriod[]> {
    const plansForNextPeriodDTO = await PlanForNextPeriodService.getPlansForNextPeriodDTO();
    const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);

    return plansForNextPeriod;
  }

  /**
 * Plan for next period
 * @returns {Promise<PlanForNextPeriod>}
 */
  public static async getPlanForNextPeriod(uuid: string): Promise<PlanForNextPeriod> {
    const PlaForNextPeriodDTO = await PlanForNextPeriodService.getPlanForNextPeriodDTO(uuid);
    const planForNextPeriod = planForNextPeriodDTOToPlanForNextPeriodConverter(PlaForNextPeriodDTO);

    return planForNextPeriod;
  }

  /**
 * Plans for next period
 * @param {PlanForNextPeriod} planForNextPeriod
 */
  public static async updatePlanForNextPeriod(planForNextPeriod: PlanForNextPeriod) {
    const planForNextPeriodDTO = planForNextPeriodToPlanForNextPeriodDTOConverter(planForNextPeriod);
    await PlanForNextPeriodService.updatePLanForNextPeriodDTO(planForNextPeriodDTO, planForNextPeriod.uuid);
  }

}