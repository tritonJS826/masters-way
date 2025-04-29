import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {TopicCard} from "src/component/topicCard/TopicCard";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {CreateTopicParams} from "src/dataAccessLogic/TopicDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {TopicsAiModal} from "src/logic/trainingPage/topicsBlock/TopicsAiModal";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {LanguageService} from "src/service/LanguageService";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/logic/trainingPage/topicsBlock/topicList/TopicList.module.scss";

/**
 * {@link TopicChildrenList} props
 */
interface TopicChildrenListProps {

    /**
     * Root topics
     */
  topics: TopicPreview[];

  /**
   * Child level (root is 0)
   */
  level: number;

  /**
   * Is metric editable
   */
  isEditable: boolean;

  /**
   * Callback delete topic on trigger click
   */
  deleteTopic: (metricUuid: string) => void;

  /**
   * Add nested topic
   */
  addTopic: (params: CreateTopicParams) => void;

}

const LEVEL_INCREMENT = 1;

/**
 * Item for topic children list
 */
export const TopicChildrenList = observer((props: TopicChildrenListProps) => {
  const {language} = languageStore;

  /**
   * ChildrenItem
   */
  const renderChildrenItem = (childTopic: TopicPreview) => {

    const levelArray = [...Array(props.level).keys()];

    return (
      <VerticalContainer key={childTopic.uuid}>
        <HorizontalContainer className={styles.singularTopic}>
          <HorizontalContainer className={styles.topicBullet}>
            {levelArray.map(item => {
              return (
                <div
                  key={item}
                  className={styles.tabContainer}
                >
                  {Symbols.BULLET}
                </div>
              );
            })}
            <TopicCard
              trainingUuid={childTopic.trainingUuid}
              topic={childTopic}
              createdAtText={LanguageService.training.topicsBlock.createdAt[language]}
              theoryMaterialTooltip={LanguageService.training.topicsBlock.tooltips.theoryMaterialAmount[language]}
              practiceMaterialTooltip={LanguageService.training.topicsBlock.tooltips.practiceMaterialAmount[language]}
              emptyTitle={LanguageService.common.emptyMarkdown[language]}
              isEditable={props.isEditable}
              externalLinkTooltip={LanguageService.training.topicsBlock.tooltips.externalLink[language]}
            />
          </HorizontalContainer>

          {props.isEditable && (
            <HorizontalContainer>
              <Button
                icon={
                  <Icon
                    size={IconSize.SMALL}
                    name="PlusIcon"
                  />
                }
                buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                onClick={() => {
                  props.addTopic({
                    trainingId: childTopic.trainingUuid,
                    topicParentId: childTopic.uuid,
                  });
                }}
              />
              <Modal
                trigger={
                  <Tooltip
                    position={PositionTooltip.TOP}
                    content={LanguageService.training.aiButtons.generateTopicWithAIButton[language]}
                  >
                    <Button
                      onClick={() => { }}
                      buttonType={ButtonType.ICON_BUTTON}
                      value="GE"
                      className={styles.aiButton}
                    />
                  </Tooltip>
                }
                content={
                  <TopicsAiModal
                    addTopic={(topic: TopicPreview) => props.addTopic({
                      trainingId: topic.trainingUuid,
                      topicParentId: childTopic.uuid,
                      topicName: topic.name,
                    })}
                    trainingId={childTopic.trainingUuid}
                  />
                }
              />
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
                      `${LanguageService.training.topicsBlock.deleteTopicQuestion[language]} "${childTopic.name}"?`,
                    )}
                  </p>}
                  onOk={() => props.deleteTopic(childTopic.uuid)}
                  okText={LanguageService.modals.confirmModal.deleteButton[language]}
                  cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
                />
              </Tooltip>

            </HorizontalContainer>
          )}
        </HorizontalContainer>
        <TopicChildrenList
          level={props.level + LEVEL_INCREMENT}
          topics={childTopic.children}
          deleteTopic={props.deleteTopic}
          isEditable={props.isEditable}
          addTopic={props.addTopic}
        />
      </VerticalContainer>
    );
  };

  const childrenList = props.topics.map(renderChildrenItem);

  return childrenList;
});
