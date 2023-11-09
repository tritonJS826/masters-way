import {updateCurrentProblem} from "src/logic/reportsTable/renderCellValue/helpers/updateCurrentProblem";
import {updateDayReport} from "src/logic/reportsTable/renderCellValue/helpers/updateDayReport";
import {updateJobDone} from "src/logic/reportsTable/renderCellValue/helpers/updateJobDone";
import {updateJobDoneTime} from "src/logic/reportsTable/renderCellValue/helpers/updateJobDoneTime";
import {updateMentorComment} from "src/logic/reportsTable/renderCellValue/helpers/updateMentorComment";
import {updatePlanForNextPeriod} from "src/logic/reportsTable/renderCellValue/helpers/updatePlanForNextPeriod";
import {updatePlanForNextPeriodTime} from "src/logic/reportsTable/renderCellValue/helpers/updatePlanForNextPeriodTime";
import {ColumnNameProps} from "src/logic/reportsTable/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

const updateCellsFunctions: Record<string, (text: string, uuid: string) => Promise<void>> = {
  updateJobDone,
  updatePlanForNextPeriod,
  updateCurrentProblem,
  updateMentorComment,
  updateJobDoneTime,
  updatePlanForNextPeriodTime,

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
  time?: boolean,
  parentUuid?: string,
  columnName?: keyof ColumnNameProps,
  index?: number,
) => {
  if (arrayItem) {
    if (time) {
      updateCells(`update${arrayItem.constructor.name}Time`, text, arrayItem.uuid);
    } else {
      updateCells(`update${arrayItem.constructor.name}`, text, arrayItem.uuid);
    }
  } else if (parentUuid && columnName && index) {
    updateDayReport(text, parentUuid, columnName, index);
  }
  callback(false);
};