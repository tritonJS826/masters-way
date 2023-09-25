import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {TimeUnit} from "src/model/businessModel/time/timeUnit/TimeUnit";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";

export const planForNextPeriodDTOToPlanForNextPeriodConverter = (planForNextPeriodDTO: PlanForNextPeriodDTO) => {
  return new PlanForNextPeriod({
    ...planForNextPeriodDTO,
    timeUnit: TimeUnit[planForNextPeriodDTO.timeUnit],
    getPlanForNextPeriod: function() {
      return `${this.job} (${this.estimationTime} ${this.timeUnit})`;
    },
  });
};

