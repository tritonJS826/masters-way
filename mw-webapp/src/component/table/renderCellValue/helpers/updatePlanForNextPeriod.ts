import {getPlanForNextPeriod, updatesPlanForNextPeriod} from "src/dataAccessLogic/getPlansForNextPeriod";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Update data in PlansForNextPeriod collection
 * @param {string} text
 * @param {string} uuid
 */
export const updatePlanForNextPeriod = async (text: string, uuid: string) => {
  const oldPlanForNextPeriod = await getPlanForNextPeriod(uuid);
  const time = Number(/\d+/.exec(text)) ?? 0;
  const job = text.replace(/\d/g, "");
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    job,
    estimationTime: time,
  });

  await updatesPlanForNextPeriod(updatedPlanForNextPeriod);
};