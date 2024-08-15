import {useEffect, useState} from "react";
import clsx from "clsx";
import {Text} from "src/component/text/Text";
import {Textarea} from "src/component/textarea/Textarea";
import {KeySymbols} from "src/utils/KeySymbols";
import {displayValidationError} from "src/utils/validatorsValue/displayValidationError";
import {validateValue} from "src/utils/validatorsValue/validateValue";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
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
   * Array of validator functions to be applied to the value
   */
    validators?: ValidatorValue[];
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
    if (!props.validators) {
      setText(value);
    } else {
      const error = validateValue({value, validators: props.validators});

      error ? displayValidationError?.(error) : setText(value);
    }
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

