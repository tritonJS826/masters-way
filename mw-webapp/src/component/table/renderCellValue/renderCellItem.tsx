import {useState} from "react";
import {Input} from "src/component/input/Input";
import {handleChange} from "src/component/table/renderCellValue/handlers/handleChange";
import {setTrueValue} from "src/component/table/renderCellValue/handlers/setTrueValue";
import {updateCell} from "src/component/table/renderCellValue/helpers/updateCell";
import {renderCellSpan} from "src/component/table/renderCellValue/renderCellSpan";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Properties of {@link DayReport} that have type string[] for dynamic update
 */
export interface ColumnNameProps {
  /**
   * Student comments
   */
  studentComments: string[];
  /**
   * LearnedForToday
   */
  learnedForToday: string[];
}

/**
 * Cell item props
 */
interface CellItemProps {
  /**
   * Cell item's text
   */
  item: string;
  /**
   * Element of custom arrays
   */
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;
  /**
   * Parent uuid for cells with type string[]
   */
  parentUuid?: string;
  /**
   * Column name for cells with type string[]
   */
  columnName?: keyof ColumnNameProps;
  /**
   * Index of element for cells with type string[]
   */
  index?: number;
  /**
   * Value isDone for different styles for cells with type string[]
   */
  isDone?: boolean;
}

/**
 * Render Input or span depend on client actions
 * @param {CellItemProps} props
 * @returns {JSX.Element} JSX.Element
 */
export const renderCellItem = (props: CellItemProps): JSX.Element => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.item);

  /**
   * Update cell value after onBlur event
   */
  const handleBlur = async () => {
    updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName, props.index);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName, props.index);
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
      onChange={(event) => handleChange(event, setText)}
    />
  );

  return (
    <div
      onDoubleClick={() => setTrueValue(setIsEditing)}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
    >
      {isEditing
        ? renderInput()
        :
        renderCellSpan(text, props.isDone)
      }
    </div>
  );
};