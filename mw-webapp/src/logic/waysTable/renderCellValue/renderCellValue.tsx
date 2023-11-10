import {useState} from "react";
import {Input} from "src/component/input/Input";
import {renderCellSpan} from "src/logic/waysTable/renderCellValue/helpers/renderCellSpan";
import {updateCell} from "src/logic/waysTable/renderCellValue/helpers/updateCell";
import {GoalPreview} from "src/model/businessModelPreview/GoalPreview";

/**
 * Name of columns in Way table that can be changed by owner
 */
export interface ColumnNameProps {

  /**
   * Column Name
   */
  name: string;

  /**
   * Column isCompleted
   */
  isCompleted: boolean;
}

/**
 * Cell item props
 */
interface CellItemProps {

  /**
   * Cell item's text
   */
  content: string;

  /**
   * Element of custom arrays
   */
  arrayItem?: GoalPreview;

  /**
   * Parent uuid for cells with type string
   */
  parentUuid?: string;

  /**
   * Column name for cells with type string
   */
  columnName?: keyof ColumnNameProps;

  /**
   * Value isCompleted for different styles
   */
  isWayCompleted?: boolean;
}

/**
 * Render Input or span depend on client actions
 */
export const renderCellValue = (props: CellItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.content);

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = async () => {
    updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName);
    }
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <Input
      type="text"
      value={text}
      autoFocus={true}
      onChange={(event) => setText(event)}
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
        renderCellSpan(text, props.isWayCompleted)
      }
    </div>
  );
};