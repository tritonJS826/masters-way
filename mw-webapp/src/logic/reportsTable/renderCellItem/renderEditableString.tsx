import {useState} from "react";
import {EditableText} from "src/component/editableText/EditableText";
import {updateElementString} from "src/logic/reportsTable/renderCellItem/helpers/updateElementString";

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
  const handleChangeString = (text: string) => {
    updateElementString({text, rowUuid: props.rowUuid, propertyName: props.propertyName, index: props.index});
    setContent(text);
  };

  return (
    <EditableText
      content={content}
      onChangeText={handleChangeString}
    />
  );
};