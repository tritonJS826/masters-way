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
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/resultTestPage/trainingAiModal/TrainingAiModal.module.scss";

const MIN_TOPICS_AMOUNT = 1;
const MAX_TOPICS_AMOUNT = 50;
const MIN_PRACTICE_MATERIALS_AMOUNT = 1;
const MAX_PRACTICE_MATERIALS_AMOUNT = 20;

/**
 * Get an integer with mathematical rounding max value
 */
export const getValidatedInteger = (amount: number, maxAmount: number) => {
  return amount <= maxAmount
    ? Math.round(amount)
    : maxAmount;
};

/**
 * TrainingAiModal props
 */
interface TrainingAiModalProps {

  /**
   * Test uuid
   */
  testId: string;

  /**
   * Test session Uuid
   */
  testSessionId: string;

  /**
   * Session result Uuid
   */
  sessionResultId: string;

  /**
   * Callback triggered on click generate training button
   */
  onGenerateTraining: (trainingUuid: string) => void;

  /**
   * Callback triggered on close modal
   */
  onCloseModal: (isOk: boolean) => void;
}

/**
 * Content for create training with Ai based on test result modal
 */
export const TrainingAiModal = (props: TrainingAiModalProps) => {
  const {theme} = themeStore;
  const {language} = languageStore;

  const [inputTopicsAmount, setInputTopicsAmount] = useState<number>(MIN_TOPICS_AMOUNT);
  const [inputPracticeMaterialsAmount, setInputPracticeMaterialsAmount] = useState<number>(MIN_PRACTICE_MATERIALS_AMOUNT);
  const [isGeneratingTraining, setIsGeneratingTraining] = useState<boolean>(false);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);
  const [isButtonToGeneratePressed, setIsButtonToGeneratePressed] = useState<boolean>(false);

  /**
   * Generate AI training
   */
  const generateAITraining = async () => {
    try {
      const trainingUuid = await AIDAL.aiCreateTrainingByTestSession({
        generateTopicsAmount: inputTopicsAmount,
        language,
        practiceMaterialInEachTopic: inputPracticeMaterialsAmount,
        sessionResultId: props.sessionResultId,
        testId: props.testId,
        testSessionId: props.testSessionId,
      });

      props.onCloseModal(true);
      props.onGenerateTraining(trainingUuid);

    } catch (error) {
      setIsErrorCatched(true);
      props.onCloseModal(false);
      //TODO: need manage error somehow
      throw error;
    } finally {
      setIsGeneratingTraining(false);
    }
  };

  return (
    <VerticalContainer className={styles.trainingAiModalWrapper}>
      {!isButtonToGeneratePressed &&
      <>
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.resultTest.buttons.chooseTopicsAmountToGenerate[language]}
        />
        <Input
          value={inputTopicsAmount}
          type="number"
          max={MAX_TOPICS_AMOUNT}
          min={MIN_TOPICS_AMOUNT}
          onChange={(amount) => setInputTopicsAmount(getValidatedInteger(Number(amount), MAX_TOPICS_AMOUNT))}
          typeInput={InputType.Border}
          autoFocus={true}
          formatter={getFormattedValue}
        />
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.resultTest.buttons.choosePracticeMaterialInTopicAmountToGenerate[language]}
        />
        <Input
          value={inputPracticeMaterialsAmount}
          type="number"
          max={MAX_PRACTICE_MATERIALS_AMOUNT}
          min={MIN_PRACTICE_MATERIALS_AMOUNT}
          onChange={(amount) => setInputPracticeMaterialsAmount(
            getValidatedInteger(Number(amount), MAX_PRACTICE_MATERIALS_AMOUNT),
          )}
          typeInput={InputType.Border}
          formatter={getFormattedValue}
        />
        <div>
          {LanguageService.resultTest.waitGenerateTopics[language]}
        </div>
        <Button
          value={LanguageService.resultTest.buttons.generateTrainingWithAIButton[language]}
          onClick={() => {
            setIsErrorCatched(false);
            setIsGeneratingTraining(true);
            setIsButtonToGeneratePressed(true);
            generateAITraining();
          }}
        />
      </>
      }
      {isGeneratingTraining && !isErrorCatched &&
        <Loader theme={theme} />
      }
      {/* {isButtonToGeneratePressed && !isGeneratingTraining && !isErrorCatched &&
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.resultTest.notification.successGeneratedTraining[language]}
        />
      }
      {isErrorCatched &&
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.error.onClickError[language]}
        />
      } */}

    </VerticalContainer>
  );

};
