import {HTMLInputTypeAttribute} from "react";
import clsx from "clsx";
import {InputMode} from "src/component/input/InputMode";
import styles from "src/component/input/Input.module.scss";

/**
 * Input's props
 */
interface InputProps {

  /**
   * Input's value
   */
  value: string | number;

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
   * Tracks the value entered into the input
   */
  onChange: (value: string) => void;

  /**
   * Formatting value entered into the input
   */
  formatter?: (stateValue: string | number) => string | number;

  /**
   * Parsing formated value
   */
  parser?: (rawValue: string) => string;

}

/**
 * Input component
 */
export const Input = (props: InputProps) => {

  /**
   * Event handler for the input change event
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const parsedValue = props.parser ? props.parser(event.target.value) : event.target.value;
    props.onChange(parsedValue);
  };

  return (
    <input
      value={props.formatter ? props.formatter(props.value) : props.value}
      type={props.type ?? "text"}
      max={props.max}
      placeholder={props.placeholder}
      className={clsx(styles.input, props.className)}
      inputMode={props.inputMode}
      disabled={!!props.disabled}
      required={!!props.required}
      autoFocus={!!props.autoFocus}
      onChange={onChange}
    />
  );
};
