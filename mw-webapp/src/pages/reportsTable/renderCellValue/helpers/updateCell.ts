import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";
import {updateCurrentProblem} from "src/pages/reportsTable/renderCellValue/helpers/updateCurrentProblem";
import {updateDayReport} from "src/pages/reportsTable/renderCellValue/helpers/updateDayReport";
import {updateJobDone} from "src/pages/reportsTable/renderCellValue/helpers/updateJobDone";
import {updateMentorComment} from "src/pages/reportsTable/renderCellValue/helpers/updateMentorComment";
import {updatePlanForNextPeriod} from "src/pages/reportsTable/renderCellValue/helpers/updatePlanForNextPeriod";
import {ColumnNameProps} from "src/pages/reportsTable/renderCellValue/renderCellItem";

const updateCellsFunctions: Record<string, (text: string, uuid: string) => Promise<void>> = {
  updateJobDone,
  updatePlanForNextPeriod,
  updateCurrentProblem,
  updateMentorComment,
};

/**
 * Update cells
 */
const updateCells = (nameOfFunction: string, text: string, uuid: string) => {
  if (!updateCellsFunctions[nameOfFunction]) {
    throw new Error("Function is not exist");
  }

  return updateCellsFunctions[nameOfFunction](text, uuid);
};

/**
 * Update cell value
 */
export const updateCell = (
  text: string,
  callback: (arg: boolean) => void,
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment,
  parentUuid?: string,
  columnName?: keyof ColumnNameProps,
  index?: number,
) => {
  if (arrayItem) {
    updateCells(`update${arrayItem.constructor.name}`, text, arrayItem.uuid);
  } else {
    updateDayReport(text, parentUuid!, columnName!, index!);
  }
  callback(false);
};