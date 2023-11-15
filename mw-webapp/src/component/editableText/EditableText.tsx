import {useState} from "react";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";

/**
 * Cell item props
 */
interface EditableTextProps<T> {

  /**
   * Cell item's text
   */
  text: T;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: T) => void;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableText = <T extends string | number>(props: EditableTextProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<T>(props.text);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(text);
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
    if (event.key === KeySymbols.ENTER) {
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
      onChange={(event) => setText(event as T)}
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