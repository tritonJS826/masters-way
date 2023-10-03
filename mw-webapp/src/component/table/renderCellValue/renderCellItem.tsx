import {useState} from "react";
import {Input} from "src/component/input/Input";
import {handleChange} from "src/component/table/renderCellValue/handlers/handleChange";
import {handleDoubleClick} from "src/component/table/renderCellValue/handlers/handleDoubleClick";
import {updateCell} from "src/component/table/renderCellValue/helpers/updateCell";
import {renderCellSpan} from "src/component/table/renderCellValue/renderCellSpan";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

interface ColumnNameProps {
  studentComments: string[];
  learnedForToday: string[];
}

interface CellItemProps {
  item: string;
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;
  parentUuid?: string;
  columnName?: keyof ColumnNameProps;
  index?: number;
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

  const handleBlur = async () => {
    updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName, props.index);
  };

  const handleEnter = async (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      updateCell(text, setIsEditing, props.arrayItem, props.parentUuid, props.columnName, props.index);
    }
  };

  const renderInput = () => (
    <Input
      type="text"
      value={text}
      autoFocus={true}
      onChange={(event) => handleChange(event, setText)}
      onBlur={handleBlur}
      onKeyDown={handleEnter}
    />
  );

  return (
    <div onDoubleClick={() => handleDoubleClick(setIsEditing)}>
      {isEditing
        ? renderInput()
        :
        renderCellSpan(text, props.isDone)
      }
    </div>
  );
};