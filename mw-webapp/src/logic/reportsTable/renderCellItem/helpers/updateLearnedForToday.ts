import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * LearnedForToday props
 */
interface LearnedForTodayProps {

  /**
   * Updated text
   */
  updatedText: string;

  /**
   * DayReport UUID
   */
  dayReportUuid: string;

  /**
   * Index of element
   */
  index: number;
}

/**
 * Update LearnedForToday
 */
export const updateLearnedForToday = async (props: LearnedForTodayProps) => {
  const oldDayReport = await DayReportDAL.getDayReport(props.dayReportUuid);

  const getUpdatedText = oldDayReport.learnedForToday.map((item: string, i: number) => {
    if (i === props.index) {
      return `${props.updatedText}`;
    }

    return item;
  });

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    learnedForToday: getUpdatedText,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};