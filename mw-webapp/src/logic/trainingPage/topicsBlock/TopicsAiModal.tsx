import {useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {makeAutoObservable} from "mobx";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {getFormattedValue} from "src/component/editableText/getFormattedValue";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {Loader} from "src/component/loader/Loader";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/trainingPage/topicsBlock/TopicsAiModal.module.scss";

const DEFAULT_TOPICS_AMOUNT = 3;
const MIN_TOPICS_AMOUNT = 1;
const MAX_TOPICS_AMOUNT = 100;

/**
 * Get an integer with mathematical rounding till {@link MAX_TOPICS_AMOUNT}
 */
export const getValidatedInteger = (amount: number) => {
  return amount <= MAX_TOPICS_AMOUNT
    ? Math.round(amount)
    : MAX_TOPICS_AMOUNT;
};

/**
 * TopicsAiModal props
 */
interface TopicsAiModalProps {

    /**
     * Training uuid
     */
  trainingId: string;

  /**
   * Parent topic's uuid
   */
  topicParentUuid?: string;

  /**
   * Callback to add topic
   */
  addTopic: (topic: TopicPreview) => void;
}

/**
 * Params for {@link GeneratedTopicPreview} constructor
 */
interface TopicPreviewParams {

    /**
     * Topic preview
     */
    title: string;

    /**
     * Is topic checked
     */
    isChecked: boolean;
  }

/**
 * Topic preview
 */
class GeneratedTopicPreview {

  /**
   * Topic title
   */
  public title: string;

  /**
   * Is topic checked
   */
  public isChecked: boolean;

  constructor(args: TopicPreviewParams) {
    makeAutoObservable(this);
    this.title = args.title;
    this.isChecked = args.isChecked;
  }

  /**
   * Toggle isChecked property
   */
  public toggleIsChecked = () => {
    this.isChecked = !this.isChecked;
  };

}

/**
 * Content for topics Ai modal
 */
export const TopicsAiModal = (props: TopicsAiModalProps) => {
  const [generatedTopicsPreview, setGeneratedTopicsPreview] = useState<GeneratedTopicPreview[]>([]);
  const {theme} = themeStore;
  const {language} = languageStore;
  const {user} = userStore;

  const [inputTopicsAmount, setInputTopicsAmount] = useState<number>(DEFAULT_TOPICS_AMOUNT);
  const [isGeneratingTopics, setIsGeneratingTopics] = useState<boolean>(false);
  const [isErrorCatched, setIsErrorCatched] = useState<boolean>(false);

  if (!user) {
    throw new Error("User is not defined");
  }

  /**
   * Generate AI topics
   */
  const generateAITopics = async () => {
    try {
      const topicsPreviewRaw = await AIDAL.aiTopic({
        topicsAmount: inputTopicsAmount,
        trainingId: props.trainingId,
        topicParentId: props.topicParentUuid,
        language,
      });

      const topicsPreview = topicsPreviewRaw.map(topicPreview => new GeneratedTopicPreview({
        title: topicPreview,
        isChecked: false,
      }));
      setGeneratedTopicsPreview(topicsPreview);
      user.profileSetting.decreaseCoins(topicsPreview.length);
    } catch (error) {
      setIsErrorCatched(true);

      //TODO: need manage error somehow
      throw error;
    } finally {
      setIsGeneratingTopics(false);
    }
  };

  /**
   * Save all selected topics
   */
  const applyAllSelectedTopicsPreview = async () => {
    const checkedGeneratedTopicsNames = generatedTopicsPreview
      .filter(topicPreview => topicPreview.isChecked)
      .map((topicPreview) => topicPreview.title);

    const topics = await TopicDAL.createTopics({
      trainingId: props.trainingId,
      topicsParentId: props.topicParentUuid,
      topicsName: checkedGeneratedTopicsNames,
    });

    topics.forEach(props.addTopic);
  };

  const hasEnoughCoins = inputTopicsAmount < user.profileSetting.coins;

  return (
    <VerticalContainer className={styles.topicsAiModalWrapper}>
      {generatedTopicsPreview.length === 0 &&
        <>
          <Title
            level={HeadingLevel.h2}
            placeholder=""
            text={LanguageService.training.aiButtons.chooseTopicsAmountToGenerate[language]}
          />
          <Input
            value={inputTopicsAmount}
            type="number"
            max={MAX_TOPICS_AMOUNT}
            min={MIN_TOPICS_AMOUNT}
            onChange={(amount) => setInputTopicsAmount(getValidatedInteger(Number(amount)))}
            typeInput={InputType.Border}
            autoFocus={true}
            formatter={getFormattedValue}
          />
          {!hasEnoughCoins &&
          <div>
            {LanguageService.common.coins.notEnoughCoins[language]}
          </div>
          }
          <Button
            value={LanguageService.training.aiButtons.generateTopicWithAIButton[language]}
            onClick={() => {
              setIsErrorCatched(false);
              setIsGeneratingTopics(true);
              generateAITopics();
            }}
            isDisabled={!hasEnoughCoins}
          />
        </>
      }
      {isGeneratingTopics && !isErrorCatched &&
        <Loader theme={theme} />
      }
      {isErrorCatched &&
        <Title
          level={HeadingLevel.h2}
          placeholder=""
          text={LanguageService.error.onClickError[language]}
        />
      }
      {generatedTopicsPreview.length > 0 &&
        (
          <VerticalContainer className={styles.generatedMetricsList}>
            {generatedTopicsPreview.map(generatedTopic => (
              <HorizontalContainer key={generatedTopic.title}>
                <Checkbox onChange={generatedTopic.toggleIsChecked} />
                {generatedTopic.title}
              </HorizontalContainer>
            ))}
            <HorizontalContainer>
              <DialogClose asChild>
                <Button
                  value={LanguageService.modals.confirmModal.cancelButton[language]}
                  onClick={() => {}}
                />
              </DialogClose>
              <DialogClose asChild>
                <Button
                  value={LanguageService.training.aiButtons.saveTopicWithAIButton[language]}
                  onClick={applyAllSelectedTopicsPreview}
                />
              </DialogClose>
            </HorizontalContainer>
          </VerticalContainer>
        )}

    </VerticalContainer>
  );

};
