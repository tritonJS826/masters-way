import {useEffect, useState} from "react";
import clsx from "clsx";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {Text} from "src/component/text/Text";
import {Textarea} from "src/component/textarea/Textarea";
import {getValidValue} from "src/utils/getValidValue";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/editableTextarea/editableTextarea.module.scss";

/**
 * Data attributes for cypress testing
 */
interface CyEditableTextarea {

  /**
   * Data attributes for cypress testing
   */
  textArea: string;

  /**
   * Data attributes for cypress testing
   */
  trigger: string;
}

/**
 * Cell item props
 */
interface EditableTextareaProps {

  /**
   * Cell item's text
   */
  text: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: string) => void;

  /**
   * Class name for the editable input
   */
  className?: string;

  /**
   * Textarea placeholder text
   */
  placeholder: string;

  /**
   * Textarea rows.
   * @default 2
   */
  rows?: number;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default true
   */
  isEditable?: boolean;

  /**
   * Data attributes for cypress testing
   */
  cy?: CyEditableTextarea;

  /**
   * Minimum symbols amount for text
   */
  minLength?: number;

  /**
   * Maximum symbols amount for text
   */
  maxLength?: number;

  /**
   * Notification text for minimum length teaxterea
   */
  notificationMinLengthText?: string;

  /**
   * Notification text for maximum length teaxterea
   */
  notificationMaxLengthText?: string;
}

/**
 * EditableTextarea component
 */
export const EditableTextarea = (props: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const isEmptyText = text.toString().trim() === "";

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(text);
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleCtrlEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER && event.ctrlKey) {
      handleChangeFinish();
    }
  };

  /**
   * Func onChangeInput
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

  /**
   * Render Textarea
   */
  const renderTextarea = () => (
    <Textarea
      cy={props.cy?.textArea}
      defaultValue={text}
      onChange={onChangeInput}
      placeholder={props.placeholder}
      rows={props.rows}
      isAutofocus
      onKeyPress={handleCtrlEnter}
    />
  );

  return (
    <div
      onDoubleClick={() => {
        props.isEditable !== false && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      onKeyDown={handleCtrlEnter}
      className={clsx(styles.editableTextarea, props.className)}
      data-cy={props.cy?.trigger}
    >
      {
        isEditing
          ? renderTextarea()
          : <Text text={isEmptyText ? props.placeholder : text} />
      }
    </div>
  );
};

