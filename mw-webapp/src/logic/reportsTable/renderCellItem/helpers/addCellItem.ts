import {addCurrentProblem} from "src/logic/reportsTable/renderCellItem/helpers/addCurrentProblem";
import {addItemDayReport} from "src/logic/reportsTable/renderCellItem/helpers/addItemDayReport";
import {addJobDone} from "src/logic/reportsTable/renderCellItem/helpers/addJobDone";
import {addMentorComment} from "src/logic/reportsTable/renderCellItem/helpers/addMentorComment";
import {addPlanForNextPeriod} from "src/logic/reportsTable/renderCellItem/helpers/addPlanForNextPeriod";

/**
 * CellItem props
 */
interface CellItemProps {

  /**
   * DayReport's uuid
   */
  rowUuid: string;

  /**
   * Type of data inside cell
   */
  dataType: "JobDone" | "PlanForNextPeriod" | "CurrentProblem" | "MentorComment" | "studentComments" | "learnedForToday";

}

const addCellItemFunctions: Record<string, (uuid: string) => Promise<void>> = {
  addJobDone,
  addPlanForNextPeriod,
  addCurrentProblem,
  addMentorComment,
};

/**
 * Update cells
 */
const addItemCell = (nameOfFunction: string, uuid: string) => {
  if (!addCellItemFunctions[nameOfFunction]) {
    throw new Error("Function is not exist");
  }

  return addCellItemFunctions[nameOfFunction](uuid);
};

/**
 * Add element (input) into cell
 */
export const addCellItem = async (props: CellItemProps) => {
  const constructorName = props.dataType;

  if (props.dataType === "JobDone"
    || props.dataType === "PlanForNextPeriod"
    || props.dataType === "CurrentProblem"
    || props.dataType === "MentorComment") {
    // Add element to cells that have own type (for example, JobDone, PlanForNextPeriod, etc)
    addItemCell(`add${constructorName}`, props.rowUuid);
  } else if (props.dataType === "studentComments" || props.dataType === "learnedForToday") {
    // Add element to cells that have type string[] (for example, cells in column studentComment)
    addItemDayReport(props.rowUuid, props.dataType);
  } else {
    throw new Error("Impossible to add new element in cell without getting column name or cell's type");
  }
};