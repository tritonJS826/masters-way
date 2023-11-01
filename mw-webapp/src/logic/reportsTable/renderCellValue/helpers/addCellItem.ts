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
   * DayReport uuid
   */
  dayReportUuid: string;

  /**
   * Type of data inside cell
   */
  dataType: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment | keyof ColumnNameProps;

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
const addItemCell = (nameOfFunction: string, dayReportUuid: string) => {
  if (!addCellItemFunctions[nameOfFunction]) {
    throw new Error("Function is not exist");
  }

  return addCellItemFunctions[nameOfFunction](dayReportUuid);
};

/**
 * Add element (input) into cell
 */
export const addCellItem = async (props: CellItemProps) => {
  const constructorName = props.dataType.constructor.name;

  if (constructorName === "JobDone" ?? "PlanForNextPeriod" ?? "CurrentProblem" ?? "MentorComment") {
    // Add element to cells that have own type (for example, JobDone, PlanForNextPeriod, etc)
    addItemCell(`add${constructorName}`, props.dayReportUuid);
  } else if (props.dataType === "studentComments" || props.dataType === "learnedForToday") {
    // Add element to cells that have type string[] (for example, cells in column studentComment)
    addItemDayReport(props.dayReportUuid, props.dataType);
  } else {
    throw new Error("Impossible to add new element in cell without getting column name or cell's type");
  }
};