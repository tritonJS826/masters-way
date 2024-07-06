import {HTMLInputTypeAttribute, useState} from "react";
import clsx from "clsx";
import {FormatterInputValue} from "src/component/input/formatters";
import {Input} from "src/component/input/Input";
import {displayNotification} from "src/component/notification/displayNotification";
import {Text} from "src/component/text/Text";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/editableText/EditableText.module.scss";

/**
 * Get formatted value
 */
export const getFormattedValue = (incomingValue: string | number) => {
  return typeof incomingValue === "number"
    ? FormatterInputValue.withNoFirstZero(incomingValue)
    : FormatterInputValue.defaultStringFormatter(incomingValue);
};

/**
 * Data attributes for cypress testing
 */
interface CyEditableText {

  /**
   * Data attributes for cypress testing
   */
  trigger: string;

  /**
   * Data attributes for cypress testing
   */
  placeholder: string;

  /**
   * Data attributes for cypress testing
   */
  inputCy: string;
}

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

  /**
   * Minimum value for input type "number"
   */
  min?: number;

  /**
   * Data attributes for cypress testing
   */
  cy?: CyEditableText;

  /**
   * Placeholder
   */
  placeholder: string;

  /**
   * Minimum symbols amount for text
   */
  minLength?: number;

}

/**
 * Render Input or span depend on client actions
 */
export const EditableText = <T extends string | number>(props: EditableTextProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);
  const isEmptyText = value.toString().trim() === "";

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
   * Check is value valid or not according min length
   */
  const getValidValue = (updateValue: string | number) => {
    if (typeof updateValue === "string") {
      if (props.minLength && updateValue.length < props.minLength) {
        displayNotification({
          text: "label should include at least one character",
          type: "info",
        });

        return;
      }
    }

    setValue(updateValue as T);
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      dataCy={props.cy?.inputCy}
      placeholder={props.cy?.placeholder ?? ""}
      formatter={getFormattedValue}
      type={props.type ?? "text"}
      max={props.max}
      min={props.min}
      value={value}
      autoFocus={true}
      onChange={getValidValue}
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
      data-cy={props.cy?.trigger}
    >
      {isEditing
        ? renderInput()
        : <Text text={isEmptyText ? props.placeholder : value} />
      }
    </div>
  );
};
