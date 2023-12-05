import {useState} from "react";
import clsx from "clsx";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Textarea} from "src/component/textarea/Textarea";
import styles from "src/component/editableTextarea/editableTextarea.module.scss";

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
   * Additional custom class name for the editable input
   */
  className?: string;

  /**
   * Textarea placeholder text
   */
  placeholder?: string;

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
}

/**
 * EditableTextarea component
 */
export const EditableTextarea = (props: EditableTextareaProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(text);
    setIsEditing(false);
  };

  /**
   * Render Textarea
   */
  const renderTextarea = () => (
    <Textarea
      defaultValue={text}
      onChange={setText}
      placeholder={props.placeholder ?? ""}
      rows={props.rows}
      isAutofocus
    />
  );

  return (
    <div
      onDoubleClick={() => {
        props.isEditable !== false && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      className={clsx(styles.editableTextarea)}
    >
      {isEditing ? renderTextarea() : renderSpan(text)}
    </div>
  );
};

