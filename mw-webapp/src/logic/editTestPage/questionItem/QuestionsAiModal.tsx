import {useState} from "react";
import {Button} from "src/component/button/Button";
import {getFormattedValue} from "src/component/editableText/getFormattedValue";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {Question} from "src/model/businessModel/Test";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/editTestPage/questionItem/QuestionsAiModal.module.scss";

const DEFAULT_QUESTIONS_AMOUNT = 3;
const MIN_QUESTIONS_AMOUNT = 1;
const MAX_QUESTIONS_AMOUNT = 50;

/**
 * Get an integer with mathematical rounding till {@link MAX_QUESTIONS_AMOUNT}
 */
export const getValidatedInteger = (amount: number) => {
  return amount <= MAX_QUESTIONS_AMOUNT
    ? Math.round(amount)
    : MAX_QUESTIONS_AMOUNT;
};

/**
 * QuestionsAiModal props
 */
interface QuestionsAiModalProps {

    /**
     * Test uuid
     */
  testId: string;

  /**
   * Callback to add generated questions
   */
  addQuestions: (questions: Question[]) => void;

  /**
   * Callback triggered on close modal
   */
  onCloseModal: (isOk: boolean) => void;
}

/**
 * Content for questions Ai modal
 */
export const QuestionsAiModal = (props: QuestionsAiModalProps) => {
  const {theme} = themeStore;
  const {language} = languageStore;

  const [inputQuestionsAmount, setInputQuestionsAmount] = useState<number>(DEFAULT_QUESTIONS_AMOUNT);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState<boolean>(false);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);
  const [isButtonToGeneratePressed, setIsButtonToGeneratePressed] = useState<boolean>(false);

  /**
   * Generate AI questions
   */
  const generateAIQuestions = async () => {
    try {
      const questions = await AIDAL.aiCreateTestQuestions({
        generateAmount: 5,
        language,
        testId: props.testId,
      });

      props.addQuestions(questions);
      props.onCloseModal(true);

    } catch (error) {
      setIsErrorCatched(true);
      props.onCloseModal(false);
      //TODO: need manage error somehow
      throw error;
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  return (
    <VerticalContainer className={styles.questionsAiModalWrapper}>
      {!isButtonToGeneratePressed &&
      <>
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.test.aiButtons.chooseQuestionsAmountToGenerate[language]}
        />
        <Input
          value={inputQuestionsAmount}
          type="number"
          max={MAX_QUESTIONS_AMOUNT}
          min={MIN_QUESTIONS_AMOUNT}
          onChange={(amount) => setInputQuestionsAmount(getValidatedInteger(Number(amount)))}
          typeInput={InputType.Border}
          autoFocus={true}
          formatter={getFormattedValue}
        />
        <Button
          value={LanguageService.test.aiButtons.generateQuestionsWithAIButton[language]}
          onClick={() => {
            setIsErrorCatched(false);
            setIsGeneratingQuestions(true);
            setIsButtonToGeneratePressed(true);
            generateAIQuestions();
          }}
        />
      </>
      }
      {isGeneratingQuestions && !isErrorCatched &&
        <Loader theme={theme} />
      }

    </VerticalContainer>
  );

};
