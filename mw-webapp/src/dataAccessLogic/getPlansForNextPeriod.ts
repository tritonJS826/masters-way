import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";

/**
 * Plans for next period
 * @returns {Promise<PlanForNextPeriod[]>}
 */
export const getPlansForNextPeriod = async (): Promise<PlanForNextPeriod[]> => {
  const plansForNextPeriodDTO = await PlanForNextPeriodService.getPlansForNextPeriodDTO();
  const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);
  return plansForNextPeriod;
};