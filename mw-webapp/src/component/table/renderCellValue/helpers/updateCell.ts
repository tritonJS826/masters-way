import {updateCurrentProblem} from "src/component/table/renderCellValue/helpers/updateCurrentProblem";
import {updateDayReport} from "src/component/table/renderCellValue/helpers/updateDayReport";
import {updateJobDone} from "src/component/table/renderCellValue/helpers/updateJobDone";
import {updateMentorComment} from "src/component/table/renderCellValue/helpers/updateMentorComment";
import {updatePlanForNextPeriod} from "src/component/table/renderCellValue/helpers/updatePlanForNextPeriod";
import {ColumnNameProps} from "src/component/table/renderCellValue/renderCellItem";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Update cell value
 * @param {string} text
 * @param {function} callback
 * @param {JobDone | PlanForNextPeriod | CurrentProblem | MentorComment | string} arrayItem
 * @param {string} parentUuid
 * @param {keyof ColumnNameProps} columnName
 * @param {number} index
 */
export const updateCell = (
  text: string,
  callback: (arg: boolean) => void,
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment | string,
  parentUuid?: string,
  columnName?: keyof ColumnNameProps,
  index?: number,
) => {
  if (arrayItem instanceof JobDone) {
    updateJobDone(text, arrayItem.uuid);
  } else if (arrayItem instanceof PlanForNextPeriod) {
    updatePlanForNextPeriod(text, arrayItem.uuid);
  } else if (arrayItem instanceof CurrentProblem) {
    updateCurrentProblem(text, arrayItem.uuid);
  } else if (arrayItem instanceof MentorComment) {
    updateMentorComment(text, arrayItem.uuid);
  } else {
    updateDayReport(text, parentUuid!, columnName!, index!);
  }
  callback(false);
};