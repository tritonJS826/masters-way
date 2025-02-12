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
import {TrainingPreview, TrainingTag, UserPreview} from "src/model/businessModelPreview/TrainingPreview";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import styles from "src/component/trainingCard/TrainingCard.module.scss";

/**
 * Training card props
 */
interface TrainingCardProps {

  /**
   * Training preview
   */
  trainingPreview: TrainingPreview;

  /**
   * Mentors text
   */
  mentorsText: string;

  /**
   * Students tooltip
   */
  studentsTooltip: string;

  /**
   * Likes tooltip
   */
  likesTooltip: string;

  /**
   * Created at tooltip
   */
  createdAtTooltip: string;

  /**
   * Updated at tooltip
   */
  updatedAtTooltip: string;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Render training tags
 */
const renderTrainingTags = (trainingTags: TrainingTag[]) => {
  return (
    <HorizontalContainer className={styles.trainingTags}>
      {trainingTags.map((trainingTag) => (
        <Tag
          tagName={trainingTag.name}
          key={trainingTag.name}
          type={TagType.CARD_TAG}
        />
      ))}
    </HorizontalContainer>
  );
};

/**
 * Render mentors
 */
const renderMentors = (mentors: UserPreview[], mentorsText: string) => {
  return (
    <HorizontalContainer className={styles.mentors}>
      <p>
        {mentorsText}
      </p>
      {mentors.map((mentor) => (
        <Tooltip
          key={mentor.name}
          position={PositionTooltip.BOTTOM}
          content={mentor.name}
        >
          <Avatar
            alt={mentor.name}
            src={mentor.imageUrl}
          />
        </Tooltip>
      ))}
    </HorizontalContainer>
  );
};

/**
 * TrainingCard component
 */
export const TrainingCard = observer((props: TrainingCardProps) => {

  return (
    <Link
      path={pages.training.getPath({uuid: props.trainingPreview.uuid})}
      className={styles.cardLink}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.trainingCardContainer}>
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.trainingPreview.name}
            >
              <Title
                text={props.trainingPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
                placeholder=""
              />
            </Tooltip>
            <HorizontalContainer className={styles.likes}>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={props.studentsTooltip}
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"UsersIcon"}
                  className={styles.icon}
                />
                {props.trainingPreview.studentsAmount}
              </Tooltip>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={props.likesTooltip}
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"StarIcon"}
                  className={styles.icon}
                />
                {props.trainingPreview.favoriteForUsersAmount}
              </Tooltip>
            </HorizontalContainer>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={renderMarkdown(props.trainingPreview.description)}
          >
            <p className={styles.trainingDescription}>
              {renderMarkdown(props.trainingPreview.description)}
            </p>
          </Tooltip>
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
            <HorizontalContainer className={styles.dateText}>
              {props.updatedAtTooltip}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.trainingPreview.updatedAt)}
              </span>
            </HorizontalContainer>
          </HorizontalContainer>
          <HorizontalContainer className={styles.people}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.trainingPreview.owner.name}
            >
              <HorizontalContainer className={styles.owner}>
                <Avatar
                  alt={props.trainingPreview.owner.name}
                  src={props.trainingPreview.owner.imageUrl}
                  className={styles.avatar}
                />
                <Text text={props.trainingPreview.owner.name} />
              </HorizontalContainer>
            </Tooltip>
            {renderMentors(props.trainingPreview.mentors, props.mentorsText)}
          </HorizontalContainer>
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
});
