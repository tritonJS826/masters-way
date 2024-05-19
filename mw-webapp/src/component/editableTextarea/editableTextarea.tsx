import {useEffect, useState} from "react";
import clsx from "clsx";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Textarea} from "src/component/textarea/Textarea";
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
}

/**
 * EditableTextarea component
 */
export const EditableTextarea = (props: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

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
   * Render Textarea
   */
  const renderTextarea = () => (
    <Textarea
      cy={props.cy?.textArea}
      defaultValue={text}
      onChange={setText}
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
      {isEditing ? renderTextarea() : renderSpan({value: text, placeholder: props.placeholder})}
    </div>
  );
};

