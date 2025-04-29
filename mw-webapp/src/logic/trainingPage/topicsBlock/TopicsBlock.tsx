import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CreateTopicParams, TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {TopicChildrenList} from "src/logic/trainingPage/topicsBlock/topicList/TopicList";
import {TopicsAiModal} from "src/logic/trainingPage/topicsBlock/TopicsAiModal";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/trainingPage/topicsBlock/TopicsBlock.module.scss";

/**
 * Topics block props
 */
interface TopicsBlockProps {

  /**
   * Training's topics
   */
  topics: TopicPreview[];

  /**
   * Training's Uuid
   */
  trainingUuid: string;

  /**
   * Is editable
   */
  isEditable: boolean;

  /**
   * Callback to add topic
   */
  addTopic: (topic: TopicPreview) => void;

  /**
   * Callback to delete topic
   */
  deleteTopic: (topicUuid: string) => void;

}

/**
 * Topics block
 */
export const TopicsBlock = observer((props: TopicsBlockProps) => {
  const {language} = languageStore;

  /**
   * Add topic
   */
  const addTopic = async (params: CreateTopicParams) => {
    const newTopic = await TopicDAL.createTopic({
      trainingId: params.trainingId,
      topicParentId: params.topicParentId,
      topicName: params.topicName,
    });
    props.addTopic(newTopic);
  };

  /**
   * Delete topic
   */
  const deleteTopic = async (topicUuid: string) => {
    props.deleteTopic(topicUuid);
    await TopicDAL.deleteTopic(topicUuid);
  };

  return (
    <VerticalContainer className={styles.topicsSection}>
      <TopicChildrenList
        level={0}
        topics={props.topics}
        isEditable={props.isEditable}
        addTopic={(params: CreateTopicParams) => addTopic({
          trainingId: params.trainingId,
          topicName: params.topicName,
          topicParentId: params.topicParentId,
        })}
        deleteTopic={(topicUuid: string) => deleteTopic(topicUuid)}
      />
      {props.isEditable &&
        <HorizontalContainer className={styles.generateTopicButtons}>
          <Button
            value={LanguageService.training.topicsBlock.addNewTopicButton[language]}
            errorClickMessage={LanguageService.error.onClickError[language]}
            onClick={() => addTopic({trainingId: props.trainingUuid})}
          />
          <Modal
            trigger={
              <Button
                value={LanguageService.training.aiButtons.generateTopicWithAIButton[language]}
                onClick={() => { }}
                buttonType={ButtonType.PRIMARY}
              />
            }
            content={
              <TopicsAiModal
                addTopic={props.addTopic}
                trainingId={props.trainingUuid}
              />
            }
            isFitContent={false}
          />
        </HorizontalContainer>
      }

    </VerticalContainer>
  );
});
