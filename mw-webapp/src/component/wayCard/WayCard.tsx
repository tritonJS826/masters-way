import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayСardTag} from "src/component/wayCard/wayTag/WayTag";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";
import {pages} from "src/router/pages";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/component/wayCard/WayCard.module.scss";

/**
 * Way card props
 */
interface WayCardProps {

  /**
   * Way preview
   */
  wayPreview: WayPreview;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * WayCard component
 */
export const WayCard = (props: WayCardProps) => {

  /**
   * Render way tags
   */
  const renderWayTags = (wayTags: WayTag[]) => {
    return (
      <HorizontalContainer className={styles.wayTags}>
        {wayTags.map((wayTag) => (
          <WayСardTag
            key={wayTag.uuid}
            tagName={wayTag.name}
          />
        ))
        }
      </HorizontalContainer>
    );
  };

  /**
   * Render mentors
   */
  const renderMentors = (mentors: UserPreview[]) => {
    return (
      <HorizontalContainer className={styles.mentors}>
        <p>
          {mentors.length ? "Mentors:" : "No mentors yet"}
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
        ))
        }
      </HorizontalContainer>
    );
  };

  return (
    <Link
      path={pages.way.getPath({uuid: props.wayPreview.uuid})}
      className={styles.cardLink}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.wayCardContainer}>
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.wayPreview.name}
            >
              <Title
                text={props.wayPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
              />
            </Tooltip>
            <HorizontalContainer className={styles.likes}>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content="Reports"
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"FileIcon"}
                  className={styles.icon}
                />
                {props.wayPreview.dayReportsAmount}
              </Tooltip>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content="Likes"
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"StarIcon"}
                  className={styles.icon}
                />
                {props.wayPreview.favoriteForUsers}
              </Tooltip>
            </HorizontalContainer>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.wayPreview.goalDescription}
          >
            <p className={styles.wayGoal}>
              {props.wayPreview.goalDescription}
            </p>
          </Tooltip>
          {renderWayTags(props.wayPreview.wayTags)}
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer className={styles.dates}>
            <p>
              {`Created: ${DateUtils.getShortISODateValue(props.wayPreview.createdAt)}`}
            </p>
            <p>
              {`Updated: ${DateUtils.getShortISODateValue(props.wayPreview.lastUpdate)}`}
            </p>
          </HorizontalContainer>
          <HorizontalContainer className={styles.people}>
            Owner:
            <Avatar
              alt={props.wayPreview.owner.name}
              src={props.wayPreview.owner.imageUrl}
            />
            {renderMentors(props.wayPreview.mentors)}
          </HorizontalContainer>
          <ProgressBar
            value={props.wayPreview.metricsDone}
            max={props.wayPreview.metricsTotal}
          />
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
};

