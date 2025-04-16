import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Text} from "src/component/text/Text";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {TopicPreview} from "src/model/businessModelPreview/TopicPreview";
import {pages} from "src/router/pages";
import styles from "src/component/topicCard/TopicCard.module.scss";

/**
 * Topic card props
 */
interface TopicCardProps {

  /**
   * Training Uuid
   */
  trainingUuid: string;

  /**
   * Topic
   */
  topic: TopicPreview;

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
   * External link tooltip
   */
  externalLinkTooltip: string;

  /**
   * Empty title for topic
   */
  emptyTitle: string;

  /**
   * If true then topic card could be editable
   */
  isEditable: boolean;

}

/**
 * TopicCard component
 */
export const TopicCard = observer((props: TopicCardProps) => {

  const isEmptyTopicName = props.topic.name.toString().trim() === "";

  return (
    props.isEditable ?
      <HorizontalContainer className={styles.topicCard}>
        <HorizontalContainer className={styles.topicTitleAndLink}>
          <Link
            path={pages.topic.getPath({trainingUuid: props.trainingUuid, topicUuid: props.topic.uuid})}
            className={styles.cardLink}
          >
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.externalLinkTooltip}
            >
              <Button
                buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                onClick={() => { }}
                icon={
                  <Icon
                    size={IconSize.SMALL}
                    name={"ExternalLinkIcon"}
                  />
                }
              />
            </Tooltip>
          </Link>
          <Text
            text={isEmptyTopicName ? props.emptyTitle : props.topic.name}
            className={styles.topicTitle}
          />
        </HorizontalContainer>
        <HorizontalContainer className={styles.topicActionButtons}>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.theoryMaterialTooltip}
          >
            <HorizontalContainer className={styles.amountInfo}>
              <Icon
                size={IconSize.SMALL}
                name={"FileTextIcon"}
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
                name={"PenToolIcon"}
                className={styles.icon}
              />
              {props.topic.practiceMaterialAmount}
            </HorizontalContainer>
          </Tooltip>
        </HorizontalContainer>
      </HorizontalContainer>
      :
      <Link
        path={pages.topic.getPath({trainingUuid: props.trainingUuid, topicUuid: props.topic.uuid})}
        className={clsx(styles.cardLink, styles.fullWidth)}
      >
        <HorizontalContainer className={styles.topicCard}>
          <Text text={isEmptyTopicName ? props.emptyTitle : props.topic.name} />
          <HorizontalContainer className={styles.topicActionButtons}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.theoryMaterialTooltip}
            >
              <HorizontalContainer className={styles.amountInfo}>
                <Icon
                  size={IconSize.SMALL}
                  name={"FileTextIcon"}
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
                  name={"PenToolIcon"}
                  className={styles.icon}
                />
                {props.topic.practiceMaterialAmount}
              </HorizontalContainer>
            </Tooltip>
          </HorizontalContainer>
        </HorizontalContainer>
      </Link>

  );
});
