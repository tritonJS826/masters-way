import {observer} from "mobx-react-lite";
import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {Tag, TagType} from "src/component/tag/Tag";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Topic} from "src/model/businessModel/Topic";
import {TrainingPreview, TrainingTag, UserPreview} from "src/model/businessModelPreview/TrainingPreview";
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
        <HorizontalContainer className={styles.likes}>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.theoryMaterialTooltip}
          >
            <Icon
              size={IconSize.SMALL}
              name={"BookIcon"}
              className={styles.icon}
            />
            {props.topic.theoryMaterialAmount}
          </Tooltip>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.practiceMaterialTooltip}
          >
            <Icon
              size={IconSize.SMALL}
              name={"ActivityIcon"}
              className={styles.icon}
            />
            {props.topic.practiceMaterialAmount}
          </Tooltip>
        </HorizontalContainer>
      </HorizontalContainer>
      {/* <VerticalContainer className={styles.trainingCardContainer}>
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <Title
              text={props.topic.name}
              level={HeadingLevel.h3}
              className={styles.title}
              placeholder=""
            />
            <HorizontalContainer className={styles.likes}>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={"hhaha"}
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"UsersIcon"}
                  className={styles.icon}
                />
                {props.topic.theoryMaterialAmount}
              </Tooltip>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={"hoho"}
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"StarIcon"}
                  className={styles.icon}
                />
                {props.topic.practiceMaterialAmount}
              </Tooltip>
            </HorizontalContainer>
          </HorizontalContainer>

          {renderTrainingTags(props.trainingPreview.trainingTags)}
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer className={styles.dates}>
            <HorizontalContainer className={styles.dateText}>
              {props.createdAtTooltip}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.trainingPreview.createdAt)}
              </span>
            </HorizontalContainer>
          </HorizontalContainer>
        </VerticalContainer>
      </VerticalContainer> */}
    </Link>
  );
});
