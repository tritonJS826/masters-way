import {planForNextPeriodDTOToPlanForNextPeriodConverter} from
  "src/dataAccessLogic/DTOToBusinessConverter/planForNextPeriodDTOToPlanForNextPeriodConverter";
import {PlanForNextPeriodService} from "src/service/PlanForNextPeriodService";


export const getPlansForNextPeriod = async () => {
  const plansForNextPeriodDTO = await PlanForNextPeriodService.getPlansForNextPeriod();
  const plansForNextPeriod = plansForNextPeriodDTO.map(planForNextPeriodDTOToPlanForNextPeriodConverter);
  return plansForNextPeriod;
};