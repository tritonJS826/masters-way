import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Update PlanForNextPeriod
 */
export const updatePlanForNextPeriod = async (text: string, uuid: string) => {
  const oldPlanForNextPeriod = await PlanForNextPeriodDAL.getPlanForNextPeriod(uuid);
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    job: text,
  });

  await PlanForNextPeriodDAL.updatePlanForNextPeriod(updatedPlanForNextPeriod);
};