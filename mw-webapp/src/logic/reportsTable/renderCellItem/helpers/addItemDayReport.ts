import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {unicodeSymbols} from "src/utils/unicodeSymbols";

/**
 * Properties of DayReport model with type string[]
 */
interface PropertyProps {

  /**
   * StudentComments property
   */
  studentComments: string;

  /**
   * LearnedForToday property
   */
  learnedForToday: string;
}

/**
 * Add item to one of property that has type string[]
 */
export const addItemDayReport = async (uuid: string, property: keyof PropertyProps) => {
  const oldDayReport = await DayReportDAL.getDayReport(uuid);

  const updatedCell = [...oldDayReport[`${property}`], unicodeSymbols.space];

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${property}`]: updatedCell,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};