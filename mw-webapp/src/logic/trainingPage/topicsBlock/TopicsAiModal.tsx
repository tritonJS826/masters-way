import {useEffect, useState} from "react";
import {DialogClose} from "@radix-ui/react-dialog";
import {makeAutoObservable} from "mobx";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Loader} from "src/component/loader/Loader";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AIDAL} from "src/dataAccessLogic/AIDAL";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/wayPage/goalMetricsBlock/GoalMetricsBlock.module.scss";

/**
 * TopicsAiModal props
 */
interface TopicsAiModalProps {

    /**
     * Topics amount
     */
    topicsAmount: number;

    /**
     * Training uuid
     */
    trainingId: string;

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

  /**
   * Generate AI topics
   */
  const generateAITopics = async () => {
    const topicsPreviewRaw = await AIDAL.aiTopic({
      topicsAmount: props.topicsAmount,
      trainingId: props.trainingId,
    });

    const topicsPreview = topicsPreviewRaw.map(topicPreview => new GeneratedTopicPreview({
      title: topicPreview,
      isChecked: false,
    }));

    setGeneratedTopicsPreview(topicsPreview);
  };

  useEffect(() => {
    generateAITopics();
  }, []);

  /**
   * Save all selected topics
   */
  const applyAllSelectedTopicsPreview = async () => {
    const checkedGeneratedTopicsPreview = generatedTopicsPreview.filter(topicPreview => topicPreview.isChecked);

    const updateTopicsPromises = checkedGeneratedTopicsPreview.map(async (topicPreview) => {
      const newTopic = await TopicDAL.createTopic({
        trainingId: props.trainingId,
        // TopicTitle: topicPreview.title,
      });

      return newTopic;
    });

    const topics = await Promise.all(updateTopicsPromises);

    topics.forEach(props.addTopic);
  };

  return generatedTopicsPreview.length === 0
    ? (
      <Loader theme={theme} />
    )
    : (
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
              value={LanguageService.training.aiButtons.generateTopicWithAIButton[language]}
              onClick={applyAllSelectedTopicsPreview}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    );
};
