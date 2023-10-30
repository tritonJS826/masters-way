import {addCurrentProblem} from "src/logic/reportsTable/renderCellValue/helpers/addCurrentProblem";
import {addItemDayReport} from "src/logic/reportsTable/renderCellValue/helpers/addItemDayReport";
import {addJobDone} from "src/logic/reportsTable/renderCellValue/helpers/addJobDone";
import {addMentorComment} from "src/logic/reportsTable/renderCellValue/helpers/addMentorComment";
import {addPlanForNextPeriod} from "src/logic/reportsTable/renderCellValue/helpers/addPlanForNextPeriod";
import {ColumnNameProps} from "src/logic/reportsTable/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * CellItem props
 */
interface CellItemProps {

  /**
   * Element of custom arrays
   */
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;

  /**
   * Parent uuid for cells with type string
   */
  parentUuid?: string;
}

const addCellItemFunctions: Record<string, (dayReportUuid: string) => Promise<void>> = {
  addJobDone,
  addPlanForNextPeriod,
  addCurrentProblem,
  addMentorComment,
};

/**
 * Update cells
 */
const updateCellItems = (nameOfFunction: string, dayReportUuid: string) => {
  if (!addCellItemFunctions[nameOfFunction]) {
    throw new Error("Function is not exist");
  }

  return addCellItemFunctions[nameOfFunction](dayReportUuid);
};

/**
 * Add element (input) into cell
 */
export const addCellItem = async (
  e: React.MouseEvent<HTMLButtonElement>,
  props: CellItemProps,
  columnName?: keyof ColumnNameProps) => {
  const dayReportUuid = e.currentTarget.parentElement!.parentElement!.parentElement!.id;
  if (props.arrayItem) {
    updateCellItems(`add${props.arrayItem.constructor.name}`, dayReportUuid);
  } else if (props.parentUuid && columnName) {
    addItemDayReport(props.parentUuid, columnName);
  }
};