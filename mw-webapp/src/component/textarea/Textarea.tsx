import {ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import styles from "src/component/textarea/Textarea.module.scss";

const DEFAULT_ROWS_AMOUNT = 1;

/**
 *Textarea classes type
 */
export enum TextareaType {
  NoBorder = "noBorder",
  Border = "border",
}

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

  /**
   * Data attributes for cypress testing
   */
  cy?: string;

  /**
   * Textarea type
   * @default 'noBorder'
   */
  typeTextarea?: TextareaType;

  /**
   * The textarea is un-clickable and unusable if true
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Handle paste event
   */
  onPaste?: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void;

  /**
   * Max text length value
   */
  maxCharacterCount?: number;
}

/**
 * Textarea component
 */
export const Textarea = (props: TextareaProps) => {
  const [value, setValue] = useState<string>(props.defaultValue || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Clear input after sending
   */
  useEffect(() => {
    setValue(props.defaultValue ?? "");
  }, [props.defaultValue]);

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
      const endPosition = textarea.value.length;
      textarea.setSelectionRange(endPosition, endPosition);
    }
  }, []);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      data-cy={props.cy}
      className={clsx(
        styles.textarea,
        styles[props.typeTextarea ?? TextareaType.NoBorder],
        props.className,
      )}
      placeholder={props.placeholder}
      value={value}
      onChange={handleTextChange}
      onPaste={props.onPaste}
      rows={props.rows ?? DEFAULT_ROWS_AMOUNT}
      autoFocus={props.isAutofocus}
      onKeyDown={props.onKeyPress}
      ref={textareaRef}
      disabled={props.isDisabled}
      maxLength={props.maxCharacterCount}
    />
  );
};
