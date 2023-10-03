import {updateCurrentProblem} from "src/component/table/renderCellValue/helpers/updateCurrentProblem";
import {updateDayReport} from "src/component/table/renderCellValue/helpers/updateDayReport";
import {updateJobDone} from "src/component/table/renderCellValue/helpers/updateJobDone";
import {updatePlanForNextPeriod} from "src/component/table/renderCellValue/helpers/updatePlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

interface DayReportProps {
  studentComments: string[];
  mentorComments: string[];
  learnedForToday: string[];
}

export const updateCell = (
  text: string,
  callback: (arg: boolean) => void,
  arrayItem?: JobDone | PlanForNextPeriod | CurrentProblem | string,
  parentUuid?: string,
  columnName?: keyof DayReportProps,
  index?: number,
) => {
  if (arrayItem instanceof JobDone) {
    updateJobDone(text, arrayItem.uuid);
  } else if (arrayItem instanceof PlanForNextPeriod) {
    updatePlanForNextPeriod(text, arrayItem.uuid);
  } else if (arrayItem instanceof CurrentProblem) {
    updateCurrentProblem(text, arrayItem.uuid);
  } else {
    updateDayReport(text, parentUuid!, columnName!, index!);
  }
  callback(false);
};