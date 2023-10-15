import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";
import {ColumnNameProps} from "src/pages/reportsTable/renderCellValue/renderCellItem";

/**
 * Update DayReport
 */
export const updateDayReport = async (updatedText: string, uuid: string, columnName: keyof ColumnNameProps, index: number) => {
  const oldDayReport = await DayReportDAL.getDayReport(uuid);

  const getUpdatedText = oldDayReport[`${columnName}`].map((item: string, i: number) => {
    if (i === index) {
      return `${updatedText}`;
    }

    return item;
  });

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${columnName}`]: getUpdatedText,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};