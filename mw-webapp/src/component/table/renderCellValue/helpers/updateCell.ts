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

// eslint-disable-next-line @typescript-eslint/ban-types
const magicWand: { [K: string]: Function } = {
  updateJobDone,
  updatePlanForNextPeriod,
  updateCurrentProblem, // This allows you to use a different value for the argument
  updateMentorComment, // ... to use multiple names for the same function
  // ... and to handle gracefully the calls of non-existing functions
};

const magicMethod = (name: string, text: string, uuid: string) => {
  if (magicWand[name]) {
    return magicWand[name](text, uuid);
  }
};

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
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment,
  parentUuid?: string,
  columnName?: keyof ColumnNameProps,
  index?: number,
) => {
  if (arrayItem) {
    // Window[`update${arrayItem.constructor.name}`](text, arrayItem.uuid);
    magicMethod(`update${arrayItem.constructor.name}`, text, arrayItem.uuid);

    // Switch (arrayItem.constructor.name) {
    //   case "JobDone": {
    //     updateJobDone(text, arrayItem.uuid);
    //     break;
    //   }
    //   case "PlanForNextPeriod": {
    //     updatePlanForNextPeriod(text, arrayItem.uuid);
    //     break;
    //   }
    //   case "CurrentProblem": {
    //     updateCurrentProblem(text, arrayItem.uuid);
    //     break;
    //   }
    //   case "MentorComment": {
    //     updateMentorComment(text, arrayItem.uuid);
    //     break;
    //   }
    // }
  } else {
    updateDayReport(text, parentUuid!, columnName!, index!);
  }
  callback(false);
};