import {useState} from "react";
import {EditableNumber} from "src/component/editableText/EditableNumber";
import {updateElementTime} from "src/logic/reportsTable/renderCellItem/helpers/updateElementTime";
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
  const handleChangeTime = (time: number) => {
    updateElementTime({time, arrayItem: props.arrayItem});
    setContent(time);
  };

  return (
    <EditableNumber
      content={content}
      onChangeNumber={handleChangeTime}
    />
  );
};