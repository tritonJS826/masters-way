import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Topic} from "src/model/businessModel/Topic";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/topicCard/TopicCard.module.scss";

/**
 * Topic card props
 */
interface TopicCardProps {

  /**
   * Topic
   */
  topic: Topic;

  /**
   * Created at text
   */
  createdAtText: string;

  /**
   * Theory material tooltip
   */
  theoryMaterialTooltip: string;

  /**
   * Practice material tooltip
   */
  practiceMaterialTooltip: string;

  /**
   * Delete topic tooltip
   */
  deleteTopicTooltip: string;

  /**
   * Delete topic question
   */
  deleteTopicQuestion: string;

  /**
   * Ok button Text for confirm
   */
  okText: string;

  /**
   * Cancel button Text for confirm
   */
  cancelText: string;

  /**
   * If true - user can add or delete topics
   */
  isEditable: boolean;

  /**
   * Delete topic callback
   */
  deleteTopic: () => void;
}

/**
 * TopicCard component
 */
export const TopicCard = observer((props: TopicCardProps) => {

  return (
    <Link
      path={pages.topic.getPath({uuid: props.topic.uuid})}
      className={styles.cardLink}
    >
      <HorizontalContainer className={styles.topicCard}>
        <Title
          text={props.topic.name}
          level={HeadingLevel.h3}
          className={styles.title}
          placeholder=""
        />
        <span className={styles.dateValue}>
          {`${props.createdAtText}: ${DateUtils.getShortISODotSplitted(props.topic.createdAt)}`}
        </span>
        <HorizontalContainer className={styles.topicActionButtons}>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.theoryMaterialTooltip}
          >
            <HorizontalContainer className={styles.amountInfo}>
              <Icon
                size={IconSize.SMALL}
                name={"BookIcon"}
                className={styles.icon}
              />
              {props.topic.theoryMaterialAmount}
            </HorizontalContainer>
          </Tooltip>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.practiceMaterialTooltip}
          >
            <HorizontalContainer className={styles.amountInfo}>
              <Icon
                size={IconSize.SMALL}
                name={"FileIcon"}
                className={styles.icon}
              />
              {props.topic.practiceMaterialAmount}
            </HorizontalContainer>
          </Tooltip>
          {props.isEditable && (
            <HorizontalContainer>
              <Tooltip content={props.deleteTopicTooltip}>
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
                      `${props.deleteTopicQuestion} "${props.topic.name}"?`,
                    )}
                  </p>}
                  onOk={props.deleteTopic}
                  okText={props.okText}
                  cancelText={props.cancelText}
                />
              </Tooltip>
            </HorizontalContainer>
          )
          }
        </HorizontalContainer>
      </HorizontalContainer>
    </Link>
  );
});
