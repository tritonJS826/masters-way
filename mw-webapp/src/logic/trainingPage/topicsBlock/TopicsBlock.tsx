import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CreateTopicsParams, TopicDAL} from "src/dataAccessLogic/TopicDAL";
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
  const addTopic = async (params: CreateTopicsParams) => {
    const newTopic = await TopicDAL.createTopics({
      trainingId: params.trainingId,
      topicsParentId: params.topicsParentId,
      topicsName: params.topicsName,
    });

    newTopic.forEach(props.addTopic);
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
        addTopic={(params: CreateTopicsParams) => addTopic({
          trainingId: params.trainingId,
          topicsName: [""],
          topicsParentId: params.topicsParentId,
        })}
        deleteTopic={(topicUuid: string) => deleteTopic(topicUuid)}
      />
      {props.isEditable &&
        <HorizontalContainer className={styles.generateTopicButtons}>
          <Button
            value={LanguageService.training.topicsBlock.addNewTopicButton[language]}
            onClick={() => addTopic({
              trainingId: props.trainingUuid,
              topicsName: [""],
            })}
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
