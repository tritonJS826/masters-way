import {updateCurrentProblem} from "src/dataAccessLogic/renderCellValue/helpers/updateCurrentProblem";
import {updateDayReport} from "src/dataAccessLogic/renderCellValue/helpers/updateDayReport";
import {updateJobDone} from "src/dataAccessLogic/renderCellValue/helpers/updateJobDone";
import {updateMentorComment} from "src/dataAccessLogic/renderCellValue/helpers/updateMentorComment";
import {updatePlanForNextPeriod} from "src/dataAccessLogic/renderCellValue/helpers/updatePlanForNextPeriod";
import {ColumnNameProps} from "src/dataAccessLogic/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

const updateCellsFunctions: Record<string, (text: string, uuid: string) => Promise<void>> = {
  updateJobDone,
  updatePlanForNextPeriod,
  updateCurrentProblem,
  updateMentorComment,
};

/**
 * Update cells
 */
const updateCells = (name: string, text: string, uuid: string) => {
  if (!updateCellsFunctions[name]) {
    throw new Error("Function is not exist");
  }

  return updateCellsFunctions[name](text, uuid);
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