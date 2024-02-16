import {HTMLInputTypeAttribute, useState} from "react";
import clsx from "clsx";
import {renderSpan} from "src/component/editableText/renderSpan";
import {FormatterInputValue} from "src/component/input/formatters";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/editableText/EditableText.module.scss";

/**
 * Cell item props
 */
interface EditableTextProps<T> {

  /**
   * Cell item's value
   */
  value: T;

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
export const EditableValue = <T extends string | number>(props: EditableTextProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(value);
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
   * Update value
   */
  const updateValue = (updatedValue: string | number) => {
    setValue(updatedValue as T);
  };

  /**
   * Get formatted value
   */
  const getFormattedValue = (incomingValue: string | number) => {
    return typeof incomingValue === "number"
      ? FormatterInputValue.withNoFirstZero(incomingValue)
      : FormatterInputValue.defaultStringFormatter(incomingValue);
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      formatter={getFormattedValue}
      type={props.type ?? "text"}
      max={props.max}
      value={value}
      autoFocus={true}
      onChange={updateValue}
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
        : renderSpan(value)
      }
    </div>
  );
};
