import {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "src/component/printedText/PrintedText.module.scss";

const DEFAULT_TYPING_SPEED = 100;

/**
 * Printed text props
 */
interface PrintedTextProps {

  /**
   * Text value
   */
  text: string;

  /**
   * Class name
   */
  className?: string;

  /**
   * Typing speed
   * @default DEFAULT_TYPING_SPEED
   */
  typingSpeed?: number;

}

/**
 * One line string with typed animation component
 */
export const PrintedText = (props: PrintedTextProps) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  useEffect(() => {
    let showCharacterAmount = 0;
    setIsTypingComplete(false);
    setDisplayedText(props.text[0]);

    const intervalId = setInterval(() => {
      // eslint-disable-next-line no-magic-numbers
      if (showCharacterAmount < props.text.length - 1) {
        setDisplayedText((prev) => prev + props.text[showCharacterAmount]);
        showCharacterAmount++;
      } else {
        clearInterval(intervalId);
        setIsTypingComplete(true);
      }
    }, props.typingSpeed ?? DEFAULT_TYPING_SPEED);

    return () => clearInterval(intervalId);

  }, [props.text]);

  return (
    <div className={clsx(styles.printedTextContainer, props.className)}>
      {displayedText}
      {!isTypingComplete && (
        <span className={styles.cursor} />
      )}
    </div>
  );
};
