import {useState} from "react";
import {EditableText} from "src/component/editableText/EditableText";
import {updateElement} from "src/logic/reportsTable/renderCellItem/helpers/updateElement";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Cell item props
 */
interface EditableTextProps {

  /**
   * Cell item's text
   */
  content: string;

  /**
   * Array item
   */
  arrayItem: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;
}

/**
 * Render Input or span depend on client actions
 */
export const renderEditableText = (props: EditableTextProps) => {
  const [content, setContent] = useState(props.content);

  /**
   * Callback get text from editable text component and set to content state
   */
  const handleChangeText = (text: string) => {
    updateElement({text, arrayItem: props.arrayItem});
    setContent(text);
  };

  return (
    <EditableText
      content={content}
      onChangeText={handleChangeText}
    />
  );
};