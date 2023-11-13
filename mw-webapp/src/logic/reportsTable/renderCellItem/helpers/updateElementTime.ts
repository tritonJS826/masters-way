import {updateJobDoneTime} from "src/logic/reportsTable/renderCellItem/helpers/updateJobDoneTime";
import {updatePlanForNextPeriodTime} from "src/logic/reportsTable/renderCellItem/helpers/updatePlanForNextPeriodTime";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * UpdateElementTime props
 */
interface UpdateElementTimeProps {

  /**
   * Text
   */
  time: number;

  /**
   * Array item
   */
  arrayItem: JobDone | PlanForNextPeriod;
}

/**
 * Update element
 */
export const updateElementTime = (props: UpdateElementTimeProps) => {
  switch (props.arrayItem.constructor.name) {
    case "JobDone":
      updateJobDoneTime({time: props.time, jobDoneUuid: props.arrayItem.uuid});
      break;
    case "PlanForNextPeriod":
      updatePlanForNextPeriodTime({estimationTime: props.time, planForNextPeriodUuid: props.arrayItem.uuid});
      break;
  }
};