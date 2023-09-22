import {querySnapshot} from "src/converter/querySnapshot";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {PlanForNextPeriod as PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriod";

export const querySnapshotToPlanForNextPeriodDTOConverter = (plansForNextPeriodRaw: querySnapshot) => {
  const plansForNextPeriodDTO: PlanForNextPeriodDTO[] = plansForNextPeriodRaw.docs.map((planForNextPeriodRaw) => ({
    uuid: planForNextPeriodRaw.data().uuid,
    job: planForNextPeriodRaw.data().job,
    timeUnit: planForNextPeriodRaw.data().timeUnit,
    estimationTime: planForNextPeriodRaw.data().estimationTime,
  }));
  return plansForNextPeriodDTO;
};

export const planForNextPeriodDTOToPlanForNextPeriodConverter = (planForNextPeriodRaw: PlanForNextPeriodDTO) => {
  return new PlanForNextPeriod({
    ...planForNextPeriodRaw,
    getPlanForNextPeriod() {
      return `${this.job} (${this.estimationTime} ${this.timeUnit})`;
    },
  });
};

