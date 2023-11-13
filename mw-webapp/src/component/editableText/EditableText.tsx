import {useState} from "react";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";

/**
 * Cell item props
 */
interface EditableTextProps {

  /**
   * Cell item's text
   */
  content: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeText: (text: string) => void;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableText = (props: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.content);

  /**
   * HandleChangeText
   */
  const handleChangeText = () => {
    props.onChangeText(text);
  };

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = async () => {
    handleChangeText();
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleChangeText();
      setIsEditing(false);
    }
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      type="text"
      value={text}
      autoFocus={true}
      onChange={(event) => setText(event)}
    />
  );

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
    >
      {isEditing
        ? renderInput()
        :
        renderSpan(text)
      }
    </div>
  );
};