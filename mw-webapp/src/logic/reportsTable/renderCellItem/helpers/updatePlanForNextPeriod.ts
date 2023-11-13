import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * PlanForNextPeriod props
 */
interface PlanForNextPeriodProps {

  /**
   * Description of plan for next period
   */
  job: string;

  /**
   * PlanForNextPeriod UUID
   */
  planForNextPeriodUuid: string;
}

/**
 * Update PlanForNextPeriod
 */
export const updatePlanForNextPeriod = async (props: PlanForNextPeriodProps) => {
  const oldPlanForNextPeriod = await PlanForNextPeriodDAL.getPlanForNextPeriod(props.planForNextPeriodUuid);
  const updatedPlanForNextPeriod: PlanForNextPeriod = new PlanForNextPeriod({
    ...oldPlanForNextPeriod,
    job: props.job,
  });

  await PlanForNextPeriodDAL.updatePlanForNextPeriod(updatedPlanForNextPeriod);
};