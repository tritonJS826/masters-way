import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriod as PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriod";

export const PlanForNextPeriodDTOToPlanForNextPeriodConverter = (planForNextPeriodRaw: PlanForNextPeriodDTO) => {
  return new PlanForNextPeriod({
    ...planForNextPeriodRaw,
    getPlanForNextPeriod() {
      return `${this.job} (${this.estimationTime} ${this.timeUnit})`;
    },
  });
};

