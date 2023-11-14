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
  value: number;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: number) => void;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableNumber = (props: EditableNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  /**
   * HandleChangeText
   */
  const handleChangeNumber = () => {
    props.onChangeFinish(value);
    setIsEditing(false);
  };

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = async () => {
    handleChangeNumber();
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleChangeNumber();
    }
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      type="number"
      value={value}
      autoFocus={true}
      onChange={(event) => setValue(Number(event))}
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
        : renderSpan(value)
      }
    </div>
  );
};