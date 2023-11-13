import {updateCurrentProblem} from "src/logic/reportsTable/renderCellItem/helpers/updateCurrentProblem";
import {updateJobDone} from "src/logic/reportsTable/renderCellItem/helpers/updateJobDone";
import {updateMentorComment} from "src/logic/reportsTable/renderCellItem/helpers/updateMentorComment";
import {updatePlanForNextPeriod} from "src/logic/reportsTable/renderCellItem/helpers/updatePlanForNextPeriod";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * UpdateElement props
 */
interface UpdateElementProps {

  /**
   * Text
   */
  text: string;

  /**
   * Array item
   */
  arrayItem: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;
}

/**
 * Update element
 */
export const updateElement = (props: UpdateElementProps) => {
  switch (props.arrayItem.constructor.name) {
    case "JobDone":
      updateJobDone({description: props.text, jobDoneUuid: props.arrayItem.uuid});
      break;
    case "PlanForNextPeriod":
      updatePlanForNextPeriod({job: props.text, planForNextPeriodUuid: props.arrayItem.uuid});
      break;
    case "CurrentProblem":
      updateCurrentProblem({description: props.text, currentProblemUuid: props.arrayItem.uuid});
      break;
    case "MentorComment":
      updateMentorComment({description: props.text, mentorCommentUuid: props.arrayItem.uuid});
      break;
  }
};