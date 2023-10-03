import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";

/**
 * Convert {@link PLanForNextPeriod} to P{@link LanForNextPeriodDTO}
 * @param {PlanForNextPeriod} planForNextPeriod
 * @returns {PlanForNextPeriodDTO} {@link PlanForNextPeriodDTO}
 */
export const planForNextPeriodToPlanForNextPeriodDTOConverter =
  (planForNextPeriod: PlanForNextPeriod): PlanForNextPeriodDTO => {
    return new PlanForNextPeriodDTO({
      ...planForNextPeriod,
      timeUnit: TimeUnit[planForNextPeriod.timeUnit],
    });
  };

