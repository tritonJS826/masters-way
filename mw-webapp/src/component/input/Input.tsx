import {HTMLInputTypeAttribute} from "react";
import clsx from "clsx";
import styles from "src/component/input/Input.module.scss";

/**
 * Input's modes {@link InputMode}
 */
export enum InputMode {
  none = "none",
  text = "text",
  tel = "tel",
  url = "url",
  email = "email",
  numeric = "numeric",
  decimal = "decimal",
  search = "search",
}

/**
 * Input's props {@link InputProps}
 */
interface InputProps {

  value: string;
  /**
   * Input's type (what type of value is expected)
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
   * Input's mode (defines what kind of input mode browser should present to the user) {@link InputMode}
   */
  inputMode?: InputMode;

  /**
   * A flag indicating whether the input available or not
   */
  disabled?: boolean;

  /**
   * A flag indicating whether the input is required or not
   */
  required?: boolean;

  /**
   * A flag indicating whether the input is autofocus or not
   */
  autoFocus?: boolean;

  /**
   * The event handler for the input change event
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * The event handler for the input change event
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;

  /**
   * The event handler for the1 input change event
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;

}

/**
 * Input component
 * @param {InputProps} props {@link InputProps}
 */
export const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <input
      value={props.value}
      type={props.type ?? "text"}
      placeholder={props.placeholder}
      className={clsx(styles.input, props.className)}
      inputMode={props.inputMode}
      disabled={!!props.disabled}
      required={!!props.required}
      autoFocus={!!props.autoFocus}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onKeyDown={props.onKeyDown}
    />
  );
};