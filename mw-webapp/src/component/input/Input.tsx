import {FC, HTMLInputTypeAttribute} from "react";
import styles from "src/component/input/Input.module.scss";

/**
 * The `InputProps` interface represents a set of properties that can be passed to the `Input` component.
 */
interface InputProps {
  /**
   * The input type of the input field. It can be one of the following values: "text", "tel", "url", "email", "numeric",
   * "decimal", "search", or undefined.
   */
  type?: HTMLInputTypeAttribute;

  /**
   * The placeholder text for the input field.
   */
  placeholder?: string;

  /**
   * The input mode of the field. It can be one of the following values: "none", "text", "tel", "url", "email", "numeric",
   * "decimal", "search", or undefined.
   */
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;

  /**
   * A flag indicating whether the input field should be disabled (unavailable for input).
   */
  disabled?: boolean;

  /**
   * A flag indicating whether the input field is required.
   */
  required?: boolean;

  /**
   * The event handler for the input field's change event.
   */
  onChange: () => void;
}

export const Input: FC<InputProps> = (props) => {
  return (
    <input
      type={props.type || "text"}
      placeholder={props.placeholder}
      className={styles.input}
      inputMode={props.inputMode}
      disabled={props.disabled || false}
      required={props.required || false}
      onChange={props.onChange}
    />
  );
};
