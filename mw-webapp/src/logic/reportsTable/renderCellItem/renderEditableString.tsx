import {useState} from "react";
import {EditableText} from "src/component/editableText/EditableText";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";

/**
 * Cell item props
 */
interface EditableStringProps {

  /**
   * Cell item's text
   */
  content: string;

  /**
   * Row item uuid
   */
  rowUuid: string;

  /**
   * Property name
   */
  propertyName: "studentComments" | "learnedForToday";

  /**
   * Index of editable element
   */
  index: number;
}

/**
 * Render Input or span depend on client actions
 */
export const renderEditableString = (props: EditableStringProps) => {
  const [content, setContent] = useState(props.content);

  /**
   * Callback get text from editable text component and set to content state
   */
  const handleChangeString = async (text: string) => {
    if (props.propertyName === "studentComments") {
      await DayReportDAL.updateStudentComment({dayReportUuid: props.rowUuid, text, index: props.index});
    } else if (props.propertyName === "learnedForToday") {
      await DayReportDAL.updateLearnedForToday({dayReportUuid: props.rowUuid, text, index: props.index});
    }
    setContent(text);
  };

  return (
    <EditableText
      content={content}
      onChangeText={handleChangeString}
    />
  );
};