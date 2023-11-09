import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Update PlanForNextPeriod
 */
export const updatePlanForNextPeriodTime = async (estimationTime: string, uuid: string) => {
  const oldPlanForNextPeriod = await PlanForNextPeriodDAL.getPlanForNextPeriod(uuid);
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    estimationTime: Number(estimationTime),
  });

  await PlanForNextPeriodDAL.updatePlanForNextPeriod(updatedPlanForNextPeriod);
};