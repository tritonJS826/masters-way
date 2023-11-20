import {useState} from "react";
import clsx from "clsx";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/editableText/EditableText.module.scss";

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

  /**
   * Additional custom class name for the editable input
   */
  className?: string;
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
   * Check type of coming value and convert it to Number if need to use input with type "number"
   */
  const setValue = (value: string) => {
    const number = Number(value);
    const updatedValue = typeof props.text === "string" ? value : number;
    setText(updatedValue as T);
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      type={typeof props.text === "string" ? "text" : "number"}
      value={text}
      autoFocus={true}
      onChange={(event) => setValue(event)}
    />
  );

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
    >
      {isEditing
        ? renderInput()
        :
        renderSpan(text)
      }
    </div>
  );
};