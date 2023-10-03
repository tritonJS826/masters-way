import {getDayReport, updatesDayReport} from "src/dataAccessLogic/getDayReports";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * Properties of {@link DayReport} that have type string[] for dynamic update
 */
interface ColumnNameProps {
  /**
   * Student comments
   */
  studentComments: string[];
  /**
   * Mentor comments
   */
  mentorComments: string[];
  /**
   * Learned for today
   */
  learnedForToday: string[];
}

/**
 * Update data in DayReport collection
 * @param {string} text
 * @param {string} uuid
 */
export const updateDayReport = async (text: string, uuid: string, columnName: keyof ColumnNameProps, index: number) => {
  const oldDayReport = await getDayReport(uuid);
  const updatedDayReport: DayReport = {
    ...oldDayReport,
    [`${columnName}`]: oldDayReport[`${columnName}`].map((item: string, i: number) => {
      if (i === index) {
        return `${text}`;
      }
      return item;
    }),
  };
  await updatesDayReport(updatedDayReport);
};