import React, {HTMLInputTypeAttribute} from "react";
import clsx from "clsx";
import styles from "src/component/input/Input.module.scss";

/**
 * Defines what kind of input mode browser should present to the user
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
 * Input's props
 */
interface InputProps {
  /**
   * Input's value
   */
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
   * Input's mode (defines what kind of input mode browser should present to the user)
   */
  inputMode?: InputMode;

  /**
   * The input usable or not
   */
  disabled?: boolean;

  /**
   * The input is required or not
   */
  required?: boolean;

  /**
   * The input is autofocus or not
   */
  autoFocus?: boolean;

  /**
   * The event handler for the input change event
   */
  onChange: (value: string) => void;

}

/**
 * Input component
 * @param {InputProps} props {@link InputProps}
 */
export const Input: React.FC<InputProps> = (props: InputProps) => {
  /**
   * Event handler for the input change event
   */
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };

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
      onChange={onChange}
    />
  );
};