import {HTMLInputTypeAttribute, useEffect, useState} from "react";
import clsx from "clsx";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";
import {FormatterInputValue} from "src/utils/FormatterUtils";
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

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default true
   */
  isEditable?: boolean;

  /**
   * Type of input
   * @default "text"
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Maximum value for input type "number"
   */
  max?: number;

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
    const checkedValue = value || 0;
    setText(checkedValue as T);
  };

  /**
   * Formatting value entered into the input
   */
  const formatterValue = (value: string|number) => {
    const formattedValue = FormatterInputValue.defaultFormatter(value);
    const updatedValue = props.type === "number" ? formattedValue : value;
    useEffect(() => {
      setText(updatedValue as T);
    }, [ updatedValue]);

    return updatedValue;
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      formatter={formatterValue}
      type={props.type ?? "text"}
      max={props.max}
      value={text}
      autoFocus={true}
      onChange={setValue}
    />
  );

  return (
    <div
      onDoubleClick={() => {
        props.isEditable !== false && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
    >
      {isEditing
        ? renderInput()
        : renderSpan(text)
      }
    </div>
  );
};
