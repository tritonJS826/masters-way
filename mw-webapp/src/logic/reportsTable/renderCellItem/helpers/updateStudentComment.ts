import {DayReportDAL} from "src/dataAccessLogic/DayReportDAL";
import {DayReport} from "src/model/businessModel/DayReport";

/**
 * StudentComment props
 */
interface StudentCommentProps {

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
 * Update Student comment
 */
export const updateStudentComment = async (props: StudentCommentProps) => {
  const oldDayReport = await DayReportDAL.getDayReport(props.dayReportUuid);

  const getUpdatedText = oldDayReport.studentComments.map((item: string, i: number) => {
    if (i === props.index) {
      return `${props.updatedText}`;
    }

    return item;
  });

  const updatedDayReport: DayReport = {
    ...oldDayReport,
    studentComments: getUpdatedText,
  };
  await DayReportDAL.updateDayReport(updatedDayReport);
};