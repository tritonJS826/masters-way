import {useState} from "react";
import {renderSpan} from "src/component/editableText/renderSpan";
import {Input} from "src/component/input/Input";

/**
 * Cell item props
 */
interface EditableNumberProps {

  /**
   * Cell item's number
   */
  content: number;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeNumber: (number: number) => void;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableNumber = (props: EditableNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [number, setNumber] = useState(props.content);

  /**
   * HandleChangeText
   */
  const handleChangeNumber = () => {
    props.onChangeNumber(number);
  };

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = async () => {
    handleChangeNumber();
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleChangeNumber();
      setIsEditing(false);
    }
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      type="number"
      value={number}
      autoFocus={true}
      onChange={(event) => setNumber(Number(event))}
    />
  );

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
    >
      {isEditing
        ? renderInput()
        :
        renderSpan(number)
      }
    </div>
  );
};