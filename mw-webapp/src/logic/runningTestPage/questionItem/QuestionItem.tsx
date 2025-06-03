import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Input, InputType} from "src/component/input/Input";
import {HeadingLevel, Title} from "src/component/title/Title";
import {QuestionDAL} from "src/dataAccessLogic/QuestionDAL";
import {QuestionResultDAL} from "src/dataAccessLogic/QuestionResultDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Question} from "src/model/businessModel/Test";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
// Import styles from "src/logic/runningTestPage/questionItem/QuestionItem.module.scss";

/**
 * Update Question params
 */
interface UpdateQuestionParams {

  /**
   * Question to update
   */
  questionToUpdate: PartialWithUuid<Question>;

  /**
   * Callback to update question
   */
  setQuestion: (question: PartialWithUuid<Question>) => void;
}

/**
 * Update Question
 */
export const updateQuestion = async (params: UpdateQuestionParams) => {
  params.setQuestion(params.questionToUpdate);
  await QuestionDAL.updateQuestion(params.questionToUpdate);
};

/**
 * Question block props
 */
interface QuestionBlockProps {

  /**
   * Test's questions
   */
  question: Question;

  /**
   * Test session uuid
   */
  testSessionUuid: string;

  /**
   * User's uuid
   */
  userUuid: string;

}

/**
 * Question item
 */
export const QuestionItem = observer((props: QuestionBlockProps) => {
  // Const {language} = languageStore;
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <>
      <Title
        level={HeadingLevel.h3}
        text={props.question.questionText}
        placeholder=""
      />

      <Input
        value={inputValue}
        placeholder="Write answer"
        onChange={(value: string) => setInputValue(value)}
        autoFocus={true}
        typeInput={InputType.Line}
      />

      <Button
        value={"Save answer"}
        onClick={async () => {
          await QuestionResultDAL.createQuestionResult({
            isOk: props.question.answer === inputValue,
            questionUuid: props.question.uuid,
            resultDescription: inputValue,
            testSessionUuid: props.testSessionUuid,
            testUuid: props.question.testUuid,
            userUuid: props.userUuid,
          });
        }}
        buttonType={ButtonType.PRIMARY}
      />
    </>
  );
});
