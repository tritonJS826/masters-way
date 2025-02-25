import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {TopicChildrenList} from "src/logic/trainingPage/topicsBlock/topicList/TopicList";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {pages} from "src/router/pages";
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
  const navigate = useNavigate();

  /**
   * Add topic
   */
  const addTopic = async (trainingId: string, topicParentId?: string) => {
    const newTopic = await TopicDAL.createTopic({
      trainingId,
      topicParentId,
    });
    // Props.addTopic(newTopic);
    navigate(pages.topic.getPath({trainingUuid: props.trainingUuid, topicUuid: newTopic.uuid}));
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
        addTopic={(parentUuid: string) => addTopic(parentUuid)}
        deleteTopic={(topicUuid: string) => deleteTopic(topicUuid)}
      />
      {props.isEditable &&
      <Button
        value={LanguageService.training.topicsBlock.addNewTopicButton[language]}
        onClick={() => addTopic(props.trainingUuid)}
      />
      }
    </VerticalContainer>
  );
});
