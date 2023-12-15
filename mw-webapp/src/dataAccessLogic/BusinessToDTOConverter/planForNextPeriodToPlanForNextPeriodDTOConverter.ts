import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriodDTO, PlanForNextPeriodDTOSchema} from "src/model/DTOModel/PlanForNextPeriodDTO";

/**
 * Convert {@link PLanForNextPeriod} to P{@link LanForNextPeriodDTO}
 */
export const planForNextPeriodToPlanForNextPeriodDTOConverter =
  (planForNextPeriod: PlanForNextPeriod): PlanForNextPeriodDTO => {
    const validatedPlanForNextPlanDTO = PlanForNextPeriodDTOSchema.parse(planForNextPeriod);

    return validatedPlanForNextPlanDTO;
  };
