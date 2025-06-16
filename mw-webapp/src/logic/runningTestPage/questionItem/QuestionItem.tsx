import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AiQuestionResultDAL} from "src/dataAccessLogic/AiQuestionResultDAL";
import {QuestionDAL} from "src/dataAccessLogic/QuestionDAL";
import {TestSessionResultDAL} from "src/dataAccessLogic/TestSessionResultDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {QuestionResult} from "src/model/businessModel/QuestionResult";
import {Question} from "src/model/businessModel/Test";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import styles from "src/logic/runningTestPage/questionItem/QuestionItem.module.scss";

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

  /**
   * If true then button to save answer will be hidden
   */
  isSavedAnswer: boolean;

  /**
   * User's answer or empty string if user not answered the question
   */
  answer: string;

  /**
   * Question's result
   */
  result?: QuestionResult;

  /**
   * If true - prevQuestion button is disabled
   */
  isPrevButtonDisabled: boolean;

  /**
   * If true - nextQuestion button is disabled
   */
  isNextButtonDisabled: boolean;

  /**
   * Callback triggered on save answer button
   */
  saveUserAnswer: (questionResult: QuestionResult) => void;

  /**
   * CAllback triggered on prevQuestion button
   */
  prevQuestion: () => void;

  /**
   * CAllback triggered on nextQuestion button
   */
  nextQuestion: () => void;

  /**
   * If true - seeREsult button is shown
   */
  isCreateSessionResultEnable: boolean;

}

/**
 * Question item
 */
export const QuestionItem = observer((props: QuestionBlockProps) => {
  const {language} = languageStore;
  const [inputValue, setInputValue] = useState<string>(props.result?.userAnswer ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    setInputValue(props.answer);
  }, [props.question]);

  return (
    <VerticalContainer className={styles.questionItem}>
      <HorizontalContainer className={styles.questionTitleAndOrder}>
        <Title
          level={HeadingLevel.h3}
          text={props.question.name}
          placeholder=""
        />
        <Text text={`${LanguageService.test.questionsBlock.questionNumber[language]} ${props.question.order}`} />
      </HorizontalContainer>

      <span>
        {renderMarkdown(props.question.questionText)}
      </span>

      <Title
        level={HeadingLevel.h4}
        text={`${LanguageService.test.testInfo.timeToTest[language]} ${props.question.timeToAnswer}`}
        placeholder=""
      />

      <Input
        value={inputValue}
        placeholder="Write answer"
        onChange={setInputValue}
        autoFocus={true}
        typeInput={InputType.Line}
        disabled={props.isSavedAnswer}
        // ClassName={props.result?.isOk ? styles.isOk : styles.isWrong}
      />

      <HorizontalContainer className={styles.questionButtons}>
        <Button
          value={LanguageService.test.buttons.prevQuestion[language]}
          onClick={props.prevQuestion}
          buttonType={ButtonType.SECONDARY}
          isDisabled={props.isPrevButtonDisabled}
        />

        <Button
          value={LanguageService.test.buttons.nextQuestion[language]}
          onClick={props.nextQuestion}
          buttonType={ButtonType.SECONDARY}
          isDisabled={props.isNextButtonDisabled}
        />

        {!props.isSavedAnswer &&
        <Button
          value={LanguageService.test.buttons.saveAnswer[language]}
          onClick={async () => {
            const questionResult = await AiQuestionResultDAL.createQuestionResult({
              isOk: props.question.answer === inputValue,
              questionUuid: props.question.uuid,
              userAnswer: inputValue,
              resultDescription: "",
              testSessionUuid: props.testSessionUuid,
              testUuid: props.question.testUuid,
              userUuid: props.userUuid,
              language,
            });
            props.saveUserAnswer(questionResult);
          }}
          buttonType={ButtonType.PRIMARY}
        />
        }

        {props.isCreateSessionResultEnable &&
        <Button
          value={LanguageService.test.buttons.seeResults[language]}
          onClick={async () => {
            await TestSessionResultDAL.createTestSessionResult({
              sessionUuid: props.testSessionUuid,
              testUuid: props.question.testUuid,
            });
            navigate(pages.resultTest.getPath({
              testUuid: props.question.testUuid,
              sessionUuid: props.testSessionUuid,
            }));
          }}
          buttonType={ButtonType.PRIMARY}
        />
        }
      </HorizontalContainer>
    </VerticalContainer>
  );
});
