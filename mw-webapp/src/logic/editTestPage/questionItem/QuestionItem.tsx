import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {EditableText} from "src/component/editableText/EditableText";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {QuestionDAL} from "src/dataAccessLogic/QuestionDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Question} from "src/model/businessModel/Test";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {PartialWithUuid} from "src/utils/PartialWithUuid";
import {maxLengthValidator, minLengthValidator} from "src/utils/validatorsValue/validators";
import styles from "src/logic/editTestPage/questionItem/QuestionItem.module.scss";

const MAX_LENGTH_QUESTION_NAME = 300;
const MIN_LENGTH_QUESTION_NAME = 1;

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
   * Is editable
   */
  isEditable: boolean;

  // /**
  //  * Callback to add question
  //  */
  // addQuestion: (question: Question) => void;

  /**
   * Callback to delete question
   */
  deleteQuestion: (questionUuid: string) => void;

}

/**
 * Question item
 */
export const QuestionItem = observer((props: QuestionBlockProps) => {
  const {language} = languageStore;

  /**
   * Delete question
   */
  const deleteQuestion = async (questionUuid: string) => {
    props.deleteQuestion(questionUuid);
    await QuestionDAL.deleteQuestion(questionUuid);
  };

  return (
    <div>
      <VerticalContainer className={styles.questionContainer}>
        <HorizontalContainer className={styles.questionTitleAndActionsBlock}>
          <Title
            level={HeadingLevel.h2}
            text={props.question.questionText}
            isEditable={props.isEditable}
            placeholder={props.isEditable
              ? LanguageService.common.emptyMarkdownAction[language]
              : LanguageService.common.emptyMarkdown[language]}
            onChangeFinish={(questionText) => {
              updateQuestion({
                questionToUpdate: {
                  uuid: props.question.uuid,
                  questionText,
                },

                /**
                 * Update question's name
                 */
                setQuestion: () => props.question.updateName(questionText),
              });
            }}
            className={styles.title}
            validators={[
              minLengthValidator(
                MIN_LENGTH_QUESTION_NAME,
                LanguageService.test.notifications.testNameMinLength[language],
              ),
              maxLengthValidator(
                MAX_LENGTH_QUESTION_NAME,
                LanguageService.test.notifications.testNameMaxLength[language],
              ),
            ]}
            maxCharacterCount={MAX_LENGTH_QUESTION_NAME}
          />
          <Tooltip content={LanguageService.test.questionsBlock.deleteQuestionTooltip[language]}>
            <Confirm
              trigger={
                <Button
                  icon={
                    <Icon
                      size={IconSize.SMALL}
                      name="TrashIcon"
                    />
                  }
                  buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                  onClick={() => {}}
                />
              }
              content={<p>
                {renderMarkdown(
                  `${LanguageService.test.questionsBlock.deleteQuestionQuestion[language]}
                          "${props.question.questionText}"?`,
                )}
              </p>}
              onOk={() => deleteQuestion(props.question.uuid)}
              okText={LanguageService.modals.confirmModal.deleteButton[language]}
              cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
            />
          </Tooltip>
        </HorizontalContainer>

      </VerticalContainer>

      <Title
        level={HeadingLevel.h3}
        text={LanguageService.test.questionsBlock.timeToAnswerTitle[language]}
        placeholder=""
      />
      <EditableText
        value={props.question.timeToAnswer}
        type="number"
        min={0}
        onChangeFinish={(timeToAnswer) => {
          updateQuestion({
            questionToUpdate: {
              uuid: props.question.uuid,
              timeToAnswer,
            },

            /**
             * Update practiceMaterial's time to answer
             */
            setQuestion: () => props.question.updateTimeToAnswer(timeToAnswer),
          });
        }}
        className={styles.timeToAnswerInput}
        isEditable={props.isEditable}
        placeholder=""
      />

      <Title
        level={HeadingLevel.h3}
        text={LanguageService.test.questionsBlock.answerTitle[language]}
        placeholder=""
      />
      <EditableTextarea
        text={props.question.answer}
        // MaxCharacterCount={MAX_TRAINING_MATERIAL_LENGTH}
        onChangeFinish={(answer) => {
          updateQuestion({
            questionToUpdate: {
              uuid: props.question.uuid,
              answer,
            },

            /**
             * Update practiceMaterial's description
             */
            setQuestion: () => props.question.updateAnswer(answer),
          });
        }}
        isEditable={props.isEditable}
        className={styles.editableTextarea}
        placeholder={props.isEditable
          ? LanguageService.common.emptyMarkdownAction[language]
          : LanguageService.common.emptyMarkdown[language]}
      />

    </div>
  );
});
