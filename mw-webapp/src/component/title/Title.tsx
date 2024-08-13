import {useEffect, useState} from "react";
import {Heading} from "@radix-ui/themes";
import clsx from "clsx";
import {Input} from "src/component/input/Input";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {getValidValue} from "src/utils/getValidValue";
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
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyInput?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyTitleContainer?: string;

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
  classNameHeading?: string;

  /**
   * Additional custom class name for the component wrapper
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
   * Function that update element on Enter click or unfocused
   */
  onValidate?: (value: string) => boolean;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default false
   */
  isEditable?: boolean;

  /**
   * Looks like it used only for logo. If logo does not use Title anymore, we can remove it
   */
  onClick?: () => void;

  /**
   * Data attribute for cypress testing
   */
  cy?: Cy;

  /**
   * Showed if value is an empty string
   */
  placeholder: string;

  /**
   * Minimum symbols amount for text
   */
  minLength?: number;

  /**
   * Maximum symbols amount for text
   */
  maxLength?: number;

  /**
   * Notification text for minimum length text
   */
  notificationMinLengthText?: string;

  /**
   * Notification text for maximum length text
   */
  notificationMaxLengthText?: string;
}

/**
 * Render Input or heading depend on client actions
 */
export const Title = (props: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(props.text);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

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

  /**
   * OnChangeInput
   */
  const onChangeInput = (value: string) => {
    const {isInvalidTextLength, notificationText} = getValidValue(value, {
      minLength: props.minLength,
      maxLength: props.maxLength,
      notificationMinLengthText: props.notificationMinLengthText,
      notificationMaxLengthText: props.notificationMaxLengthText,
    });

    isInvalidTextLength
      ? displayNotification({
        text: notificationText || "Invalid input length",
        type: NotificationType.INFO,
      })
      : setText(value);
  };

  return (
    <div
      onDoubleClick={() => {
        props.isEditable && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
      data-cy={props.cy?.dataCyTitleContainer}
    >
      {isEditing
        ? (
          <Input
            type="text"
            value={text}
            autoFocus={true}
            onChange={onChangeInput}
            dataCy={props.cy?.dataCyInput}
          />
        )
        : (
          <Heading
            onClick={props.onClick}
            as={props.level}
            className={clsx(props.classNameHeading)}
          >
            {text === "" ? props.placeholder : text}
          </Heading>
        )
      }
    </div>
  );
};
