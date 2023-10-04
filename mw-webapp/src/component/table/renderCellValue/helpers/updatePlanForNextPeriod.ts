import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Update text in PlansForNextPeriod cell
 * @param {string} text
 * @param {string} uuid
 */
export const updatePlanForNextPeriod = async (text: string, uuid: string) => {
  const oldPlanForNextPeriod = await PlanForNextPeriodDAL.getPlanForNextPeriod(uuid);
  const time = Number(/\d+/.exec(text)) ?? 0;
  const job = text.replace(/\d/g, "");
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    job,
    estimationTime: time,
  });

  await PlanForNextPeriodDAL.updatePlanForNextPeriod(updatedPlanForNextPeriod);
};