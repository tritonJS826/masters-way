import {ColumnNameProps} from "src/component/table/renderCellValue/renderCellItem";
import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Update data in DayReport collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateDayReport = async (text: string, uuid: string, columnName: keyof ColumnNameProps, index: number) => {
  const oldDayReport = await DayReportDAL.getDayReport(uuid);
  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${columnName}`]: oldDayReport[`${columnName}`].map((item: string, i: number) => {
      if (i === index) {
        return `${text}`;
      }

      return item;
    }),
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};