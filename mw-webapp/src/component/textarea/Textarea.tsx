import {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import styles from "src/component/textarea/Textarea.module.scss";

const DEFAULT_ROWS_AMOUNT = 5;

/**
 * Textarea props
 */
interface TextareaProps {

  /**
   * Textarea default value
   */
  defaultValue?: string;

  /**
   * Tracks the value entered into the Textarea
   */
  onChange?: (value: string) => void;

  /**
   * Textarea placeholder text
   */
  placeholder?: string;

  /**
   * Specifies the default height in average character heights.
   * @default {@link DEFAULT_ROWS_AMOUNT}
   */
  rows?: number;

  /**
   * Custom class for the Textarea.
   */
  className?: string;

  /**
   * Is auto focused by default
   */
  isAutofocus?: boolean;

  /**
   * Handle key press
   */
  onKeyPress?: KeyboardEventHandler<HTMLTextAreaElement>;
}

/**
 * Textarea component
 */
export const Textarea = (props: TextareaProps) => {
  const [value, setValue] = useState<string>(props.defaultValue || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Handle textarea event
   */
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (props.onChange) {
      props.onChange(event.target.value);
    }
    setValue(event.target.value);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      className={clsx(styles.textarea, props.className)}
      placeholder={props.placeholder}
      value={value}
      onChange={handleTextChange}
      rows={props.rows ?? DEFAULT_ROWS_AMOUNT}
      autoFocus={props.isAutofocus}
      ref={textareaRef}
    />
  );
};
