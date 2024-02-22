import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayTag} from "src/component/wayCard/wayTag/WayTag";
import {getFirstName} from "src/logic/waysTable/waysColumns";
import {Metric} from "src/model/businessModel/Metric";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview, WayTag as WayTagData} from "src/model/businessModelPreview/WayPreview";
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
}

/**
 * WayCard component
 */
export const WayCard = (props: WayCardProps) => {

  /**
   * Render way tags
   */
  const renderWayTags = (wayTags: WayTagData[]) => {
    return (
      <HorizontalContainer className={styles.wayTags}>
        {wayTags.map((wayTag) => (
          <WayTag
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
          Mentors:
        </p>
        {mentors.map((mentor) => (
          <Tooltip
            key={mentor.name}
            position={PositionTooltip.BOTTOM}
            content={mentor.name}
          >
            <p className={styles.mentorLink}>
              {getFirstName(mentor.name)}
            </p>
          </Tooltip>
        ))
        }
      </HorizontalContainer>
    );
  };

  const metricsParsed = props.wayPreview.metricsStringified.map((metric) => {
    const metricParsed: Metric = JSON.parse(metric);

    return metricParsed;
  });

  const doneMetricsAmount = metricsParsed.filter((metric) => !!metric.isDone).length;

  return (
    <Link
      path={pages.way.getPath({uuid: props.wayPreview.uuid})}
      className={styles.cardLink}
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
                {props.wayPreview.dayReportUuids.length}
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
                {props.wayPreview.favoriteForUserUuids.length}
              </Tooltip>
            </HorizontalContainer>
          </HorizontalContainer>
          {renderWayTags(props.wayPreview.wayTags)}
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.wayPreview.goalDescription}
          >
            <p className={styles.wayGoal}>
              {props.wayPreview.goalDescription}
            </p>
          </Tooltip>
          <HorizontalContainer className={styles.ownerInfo}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.wayPreview.owner.name}
            >
              <p className={styles.ownerLink}>
                {getFirstName(props.wayPreview.owner.name)}
              </p>
            </Tooltip>
            <p>
              {props.wayPreview.owner.email}
            </p>
          </HorizontalContainer>
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer className={styles.dates}>
            <p>
              {`Created at ${DateUtils.getShortISODateValue(props.wayPreview.createdAt)}`}
            </p>
            <p>
              {`Last update at ${DateUtils.getShortISODateValue(props.wayPreview.lastUpdate)}`}
            </p>
          </HorizontalContainer>
          {renderMentors(props.wayPreview.mentors)}
          <ProgressBar
            value={doneMetricsAmount}
            max={props.wayPreview.metricsStringified.length}
          />
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
};

