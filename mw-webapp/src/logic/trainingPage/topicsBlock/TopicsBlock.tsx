import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Infotip} from "src/component/infotip/Infotip";
import {HeadingLevel, Title} from "src/component/title/Title";
import {TopicCard} from "src/component/topicCard/TopicCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Topic} from "src/model/businessModel/Topic";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/trainingPage/topicsBlock/TopicsBlock.module.scss";

/**
 * Topics block props
 */
interface TopicsBlockProps {

  /**
   * Training's topics
   */
  topics: Topic[];

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
  addTopic: (topic: Topic) => void;

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
  const addTopic = async (trainingId: string /*parentUuid: string | null*/) => {
    const newTopic = await TopicDAL.createTopic(trainingId);
    props.addTopic(newTopic);
  };

  /**
   * Delete topic
   */
  const deleteTopic = async (topicUuid: string) => {
    props.deleteTopic(topicUuid);
    await TopicDAL.deleteTopic(topicUuid);
  };

  const topics: Topic[] = [
    {
      trainingUuid: "0b467907-61a2-4d8d-9e34-7b6490f7e454",
      createdAt: new Date(),
      name: "First topic",
      order: 1,
      parentUuid: null,
      theoryMaterialAmount: 12,
      practiceMaterialAmount: 5,
      uuid: "0001",
      children: [],
    },
    {
      trainingUuid: "0b467907-61a2-4d8d-9e34-7b6490f7e454",
      createdAt: new Date(),
      name: "First topic",
      order: 1,
      parentUuid: null,
      theoryMaterialAmount: 12,
      practiceMaterialAmount: 5,
      uuid: "0001",
      children: [],
    },
    {
      trainingUuid: "0b467907-61a2-4d8d-9e34-7b6490f7e454",
      createdAt: new Date(),
      name: "First topic",
      order: 1,
      parentUuid: null,
      theoryMaterialAmount: 12,
      practiceMaterialAmount: 5,
      uuid: "0001",
      children: [],
    },
  ];

  return (
    <VerticalContainer className={styles.topicsSection}>
      {topics.map((topic) => (
        <TopicCard
          key={topic.uuid}
          topic={topic}
          createdAtText={LanguageService.training.topicsBlock.createdAt[language]}
          theoryMaterialTooltip={LanguageService.training.topicsBlock.tooltips.theoryMaterialAmount[language]}
          practiceMaterialTooltip={LanguageService.training.topicsBlock.tooltips.practiceMaterialAmount[language]}
        />
      ))}
      <Button
        value={LanguageService.training.topicsBlock.addNewTopicButton[language]}
        onClick={() => addTopic(props.trainingUuid)}
      />
    </VerticalContainer>
  );
});
