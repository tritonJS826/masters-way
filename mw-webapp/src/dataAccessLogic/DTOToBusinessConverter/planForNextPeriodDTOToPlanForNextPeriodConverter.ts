import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriodDTO} from "src/model/DTOModel/PlanForNextPeriodDTO";

/**
 * Convert {@link PlanForNextPeriodDTO} to {@link PlanForNextPeriod}
 */
export const planForNextPeriodDTOToPlanForNextPeriodConverter =
  (planForNextPeriodDTO: PlanForNextPeriodDTO): PlanForNextPeriod => {
    return new PlanForNextPeriod(planForNextPeriodDTO);
  };

