import {useState} from "react";
import {EditableText} from "src/component/editableText/EditableText";
import {CurrentProblemDAL} from "src/dataAccessLogic/CurrentProblemDAL";
import {JobDoneDAL} from "src/dataAccessLogic/JobDoneDAL";
import {MentorCommentDAL} from "src/dataAccessLogic/MentorCommentDAL";
import {PlanForNextPeriodDAL} from "src/dataAccessLogic/PlanForNextPeriodDAL";
import {CurrentProblem} from "src/model/businessModel/CurrentProblem";
import {JobDone} from "src/model/businessModel/JobDone";
import {MentorComment} from "src/model/businessModel/MentorComment";
import {PlanForNextPeriod} from "src/model/businessModel/PlanForNextPeriod";

/**
 * Cell item props
 */
interface EditableTextProps {

  /**
   * Cell item's text
   */
  content: string;

  /**
   * Array item
   */
  arrayItem: JobDone | PlanForNextPeriod | CurrentProblem | MentorComment;
}

/**
 * Render Input or span depend on client actions
 */
export const renderEditableText = (props: EditableTextProps) => {
  const [content, setContent] = useState(props.content);

  /**
   * Callback get text from editable text component and set to content state
   */
  const handleChangeText = async (text: string) => {
    if (props.arrayItem instanceof JobDone) {
      await JobDoneDAL.updateJobDone({jobDone: props.arrayItem, description: text});
    } else if (props.arrayItem instanceof PlanForNextPeriod) {
      await PlanForNextPeriodDAL.updatePlanForNextPeriod({planForNextPeriod: props.arrayItem, job: text});
    } else if (props.arrayItem instanceof CurrentProblem) {
      await CurrentProblemDAL.updateCurrentProblem({currentProblem: props.arrayItem, description: text});
    } else if (props.arrayItem instanceof MentorComment) {
      await MentorCommentDAL.updateMentorComment({mentorComment: props.arrayItem, description: text});
    }
    setContent(text);
  };

  return (
    <EditableText
      content={content}
      onChangeText={handleChangeText}
    />
  );
};