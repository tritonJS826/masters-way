import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTO, PlanForNextPeriodDTOSchema} from "src/model/DTOModel/PlanForNextPeriodDTO";

/**
 * Convert {@link PLanForNextPeriod} to P{@link LanForNextPeriodDTO}
 */
export const planForNextPeriodToPlanForNextPeriodDTOConverter =
  (planForNextPeriod: PlanForNextPeriod): PlanForNextPeriodDTO => {
    return PlanForNextPeriodDTOSchema.parse({
      ...planForNextPeriod,
      timeUnit: TimeUnit[planForNextPeriod.timeUnit],
    });
  };