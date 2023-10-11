import {useState} from "react";
import {Input} from "src/component/input/Input";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {updateCell} from "src/pages/reportsTable/renderCellValue/helpers/updateCell";
import {renderCellSpan} from "src/pages/reportsTable/renderCellValue/renderCellSpan";

/**
 * Properties of {@link DayReport} that have type string[] for dynamic update
 */
export interface ColumnNameProps {

  /**
   * Student comments
   */
  studentComments: string[];

  /**
   * Learned for today
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
  content: string;

  /**
   * Element of custom arrays
   */
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;

  /**
   * Parent uuid for cells with type string
   */
  parentUuid?: string;

  /**
   * Column name for cells with type string[]
   */
  columnName?: keyof ColumnNameProps;

  /**
   * Index of element in string array
   */
  index?: number;

  /**
   * Value isDone for different styles
   */
  isContentDone?: boolean;
}

/**
 * Render Input or span depend on client actions
 */
export const renderCellItem = (props: CellItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.content);

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
        renderCellSpan(text, props.isContentDone)
      }
    </div>
  );
};