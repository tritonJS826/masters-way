import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {ColumnNameProps} from "src/dataAccessLogic/renderCellValue/renderCellItem";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Update DayReport
 */
export const updateDayReport = async (text: string, uuid: string, columnName: keyof ColumnNameProps, index: number) => {
  const oldDayReport = await DayReportDAL.getDayReport(uuid);

  const updatedText = oldDayReport[`${columnName}`].map((item: string, i: number) => {
    if (i === index) {
      return `${text}`;
    }

    return item;
  });

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${columnName}`]: updatedText,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};