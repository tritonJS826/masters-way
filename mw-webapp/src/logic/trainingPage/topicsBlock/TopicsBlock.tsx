import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {TopicCard} from "src/component/topicCard/TopicCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {TopicDAL} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {TopicChildrenList} from "src/logic/trainingPage/topicsBlock/topicList/TopicList";
import {Topic} from "src/model/businessModel/Topic";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
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
  const addTopic = async (trainingId: string, topicParentId?: string) => {
    const newTopic = await TopicDAL.createTopic({
      trainingId,
      topicParentId,
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
      <TopicChildrenList
        level={0}
        topics={props.topics}
        isEditable={props.isEditable}
        addTopic={(parentUuid: string) => addTopic(parentUuid)}
        deleteTopic={(topicUuid: string) => deleteTopic(topicUuid)}
      />
      {props.topics.map((topic) => (
        <HorizontalContainer
          key={topic.uuid}
          className={styles.topicItem}
        >
          {/* <TopicCard
            trainingUuid={props.trainingUuid}
            topic={topic}
            createdAtText={LanguageService.training.topicsBlock.createdAt[language]}
            theoryMaterialTooltip={LanguageService.training.topicsBlock.tooltips.theoryMaterialAmount[language]}
            practiceMaterialTooltip={LanguageService.training.topicsBlock.tooltips.practiceMaterialAmount[language]}
          />
          {props.isEditable && (
            <Tooltip content={LanguageService.training.topicsBlock.deleteTopicTooltip[language]}>
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
                    `${LanguageService.training.topicsBlock.deleteTopicQuestion[language]} "${topic.name}"?`,
                  )}
                </p>}
                onOk={() => deleteTopic(topic.uuid)}
                okText={LanguageService.modals.confirmModal.deleteButton[language]}
                cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
              />
            </Tooltip>
          )} */}
        </HorizontalContainer>
      ))}
      {props.isEditable &&
      <Button
        value={LanguageService.training.topicsBlock.addNewTopicButton[language]}
        onClick={() => addTopic(props.trainingUuid)}
      />
      }
    </VerticalContainer>
  );
});
