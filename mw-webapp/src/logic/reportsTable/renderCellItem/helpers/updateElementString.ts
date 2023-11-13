import {updateLearnedForToday} from "src/logic/reportsTable/renderCellItem/helpers/updateLearnedForToday";
import {updateStudentComment} from "src/logic/reportsTable/renderCellItem/helpers/updateStudentComment";

/**
 * UpdateElementString props
 */
interface UpdateElementStringProps {

  /**
   * Text
   */
  text: string;

  /**
   * Row item uuid
   */
  rowUuid: string;

  /**
   * Property name
   */
  propertyName: "studentComments" | "learnedForToday";

  /**
   * Index of editable element
   */
  index: number;
}

/**
 * Update element
 */
export const updateElementString = (props: UpdateElementStringProps) => {
  switch (props.propertyName) {
    case "studentComments":
      updateStudentComment({updatedText: props.text, dayReportUuid: props.rowUuid, index: props.index});
      break;
    case "learnedForToday":
      updateLearnedForToday({updatedText: props.text, dayReportUuid: props.rowUuid, index: props.index});
      break;
  }
};