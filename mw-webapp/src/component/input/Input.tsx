import {HTMLInputTypeAttribute, useEffect, useState} from "react";
import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconDictionary, IconSize} from "src/component/icon/Icon";
import {InputMode} from "src/component/input/InputMode";
import {ParserInputValue} from "src/component/input/parsers";
import styles from "src/component/input/Input.module.scss";

/**
 *InputType
 */
export enum InputType {
  Editable = "editable",
  Line = "line",
  Border = "border",
}

/**
 * Input's props
 */
interface InputProps<T extends string | number> {

  /**
   * Input's value
   */
  value: T;

  /**
   * Input's type (what type of value is expected)
   * @default "text"
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Input's placeholder text
   */
  placeholder?: string;

  /**
   * Input's class
   */
  className?: string | Array<string>;

  /**
   * Input's mode (defines what kind of input mode browser should present to the user)
   * @default: {@link InputMode.text}
   */
  inputMode?: InputMode;

  /**
   * The input is un-clickable and unusable if true
   * @default false
   */
  disabled?: boolean;

  /**
   * The input must be filled out if true
   * @default false
   */
  required?: boolean;

  /**
   * Automatically focused on input after rendering if true
   * @default false
   */
  autoFocus?: boolean;

  /**
   * Maximum value for input type "number"
   */
  max?: number;

  /**
   * Minimum value for input type "number"
   */
  min?: number;

  /**
   * Tracks the value entered into the input
   */
  onChange: (value: T) => void;

  /**
   * Formatting value
   */
  formatter?: (value: T) => string;

  /**
   * Parsing formatted value
   */
  parser?: (value: string) => T;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * TypeInputIcon
   */
  typeInputIcon?: keyof typeof IconDictionary;

  /**
   * TypeInputIcon
   * @default 'editable'
   */
  typeInput?: InputType;

  /**
   * Callback on Enter triggered
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * Input component
 */
export const Input = <T extends string | number>(props: InputProps<T>) => {
  const [text, setText] = useState<T>(props.value);

  /**
   * Clear input after sending
   */
  useEffect(() => {
    setText(props.value);
  }, [props.value]);

  /**
   * Event handler for the input change event
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let parsedValue: T;

    switch (props.type) {
      case "number": {
        parsedValue = props.parser
          ? props.parser(event.target.value)
          : ParserInputValue.defaultNumberParser(event.target.value);
        break;
      }
      case "string":
      default: {
        parsedValue = props.parser
          ? props.parser(event.target.value)
          : ParserInputValue.defaultTextParser(event.target.value);
        break;
      }
    }
    setText(parsedValue);
    props.onChange(parsedValue);
  };

  const inputTypeStyles = props.typeInput ? styles[props.typeInput] : styles[InputType.Editable];

  return (
    <HorizontalContainer className={clsx(styles.inputWrapper, inputTypeStyles)}>
      {props.typeInputIcon && (
        <Icon
          size={IconSize.SMALL}
          name={props.typeInputIcon}
          className={styles.inputIcon}
        />
      )}
      <input
        value={props.formatter ? props.formatter(text) : text}
        type={props.type ?? "text"}
        max={props.max}
        min={props.min}
        placeholder={props.placeholder}
        className={clsx(styles.input, props.className)}
        inputMode={props.inputMode}
        disabled={!!props.disabled}
        required={!!props.required}
        autoFocus={!!props.autoFocus}
        onChange={onChange}
        data-cy={props.dataCy}
        onKeyDown={props.onKeyDown}
        multiple={props.type === "file" && true}
      />
    </HorizontalContainer>
  );
};
