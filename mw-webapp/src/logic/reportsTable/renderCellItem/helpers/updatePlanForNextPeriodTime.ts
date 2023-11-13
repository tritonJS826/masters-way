import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * PlanForNextPeriodTime props
 */
interface PlanForNextPeriodTimeProps {

  /**
   * Estimation time amount
   */
  estimationTime: number;

  /**
   * PlanForNextPeriod UUID
   */
  planForNextPeriodUuid: string;
}

/**
 * Update PlanForNextPeriod
 */
export const updatePlanForNextPeriodTime = async (props: PlanForNextPeriodTimeProps) => {
  const oldPlanForNextPeriod = await PlanForNextPeriodDAL.getPlanForNextPeriod(props.planForNextPeriodUuid);
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    estimationTime: props.estimationTime,
  });

  await PlanForNextPeriodDAL.updatePlanForNextPeriod(updatedPlanForNextPeriod);
};