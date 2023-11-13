import {useState} from "react";
import {EditableNumber} from "src/component/editableText/EditableNumber";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Cell item props
 */
interface EditableTimeProps {

  /**
   * Cell item's time amount
   */
  time: number;

  /**
   * Array item
   */
  arrayItem: JobDone | PlanForNextPeriod;
}

/**
 * Render Input or span depend on client actions
 */
export const renderEditableTime = (props: EditableTimeProps) => {
  const [content, setContent] = useState(props.time);

  /**
   * Callback get text from editable text component and set to content state
   */
  const handleChangeTime = async (time: number) => {
    if (props.arrayItem instanceof JobDone) {
      await JobDoneDAL.updateJobDone({jobDone: props.arrayItem, time});
    } else if (props.arrayItem instanceof PlanForNextPeriod) {
      await PlanForNextPeriodDAL.updatePlanForNextPeriod({planForNextPeriod: props.arrayItem, time});
    }
    setContent(time);
  };

  return (
    <EditableNumber
      content={content}
      onChangeNumber={handleChangeTime}
    />
  );
};