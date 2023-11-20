import {useState} from "react";
import {Heading} from "@radix-ui/themes";
import clsx from "clsx";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/title/Title.module.scss";

/**
 * Enum representing HTML heading levels.
 */
export enum HeadingLevel {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

/**
 * Title props
 */
interface TitleProps {

  /**
   * Heading level
   */
  level: HeadingLevel;

  /**
   * Additional custom class name for the component
   */
  className?: string;

  /**
   * Title
   */
  text: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish?: (value: string) => void;

  /**
   * Is title editable or not
   */
  isEditable?: boolean;
}

/**
 * Render Input or span depend on client actions
 */
export const Title = (props: TitleProps) => {
  if (!props.isEditable) {
    return (
      <Heading
        as={props.level}
        className={clsx(styles.title, props.className)}
      >
        {props.text}
      </Heading>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(props.text);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    if (!props.onChangeFinish) {
      throw Error("Unavailable edit title");
    }
    props.onChangeFinish(text);
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

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      onBlur={() => handleChangeFinish()}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
    >
      {isEditing
        ? (
          <Input
            type="text"
            value={text}
            autoFocus={true}
            onChange={(value) => setText(value)}
          />
        )
        : (
          <Heading
            as={props.level}
            className={clsx(styles.title, props.className)}
          >
            {text}
          </Heading>
        )
      }
    </div>
  );
};