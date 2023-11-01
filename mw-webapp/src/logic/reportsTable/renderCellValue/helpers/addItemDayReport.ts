import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {ColumnNameProps} from "src/logic/reportsTable/renderCellValue/renderCellItem";
import {DayReport} from "src/model/businessModel/DayReport";
import {SPACE} from "src/utils/unicodeSymbols";

/**
 * Update DayReport
 */
export const addItemDayReport = async (uuid: string, columnName: keyof ColumnNameProps) => {
  const oldDayReport = await DayReportDAL.getDayReport(uuid);

  const updatedCell = [...oldDayReport[`${columnName}`], SPACE];

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${columnName}`]: updatedCell,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};