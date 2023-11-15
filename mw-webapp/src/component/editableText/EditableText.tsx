import {useState} from "react";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";
import {KeyboardSymbols} from "src/utils/KeyboardSymbols";

/**
 * Cell item props
 */
interface EditableTextProps {

  /**
   * Cell item's text
   */
  text: string | number;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: string) => void;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableText = (props: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(text.toString());
    setIsEditing(false);
  };

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = () => {
    handleChangeFinish();
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeyboardSymbols.ENTER) {
      handleChangeFinish();
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