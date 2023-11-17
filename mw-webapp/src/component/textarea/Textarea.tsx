import {ChangeEvent, useEffect, useRef} from "react";
import clsx from "clsx";
import styles from "src/component/textarea/Textarea.module.scss";

/**
 * Textarea props
 */
interface TextareaProps {

  /**
   * Textarea value
   */
  value: string;

  /**
   * Tracks the value entered into the Textarea
   */
  onChange: (value: string) => void;

  /**
   * Textarea placeholder text
   */
  placeholder?: string;

  /**
   * Custom class for the Textarea.
   */
  className?: string;
}

/**
 * Textarea component
 */
export const Textarea = (props: TextareaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const currentTextarea = textareaRef.current;

    if (currentTextarea) {
      currentTextarea.style.height = "auto";
      currentTextarea.style.height = `${currentTextarea.scrollHeight}px`;
    }
  }, [props.value]);

  /**
   * Handle textarea event
   */
  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.onChange(event.target.value);
  };

  return (
    <textarea
      ref={textareaRef}
      className={clsx(styles.textarea, props.className)}
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleTextChange}
    />
  );
};
