import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {WayTag} from "src/component/wayCard/wayTag/WayTag";
import {Metric} from "src/model/businessModel/Metric";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
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
  const renderWayTags = (wayTags: string[]) => {
    return (
      <HorizontalContainer className={styles.wayTags}>
        {wayTags.map((wayTag) => (
          <WayTag
            key={wayTag}
            tagName={wayTag}
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
          <Link
            key={mentor.name}
            path={pages.user.getPath({uuid: mentor.uuid})}
            value={mentor.name}
            className={styles.mentorLink}
          />
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
    <VerticalContainer className={styles.wayCardContainer}>
      <VerticalContainer className={styles.mainInfo}>
        <HorizontalContainer className={styles.nameLikes}>
          <Title
            text={props.wayPreview.name}
            level={HeadingLevel.h3}
            className={styles.title}
          />
          <HorizontalContainer className={styles.likes}>
            <Icon
              size={IconSize.SMALL}
              name={"StarIcon"}
              className={styles.icon}
            />
            {props.wayPreview.favoriteForUserUuids.length}
          </HorizontalContainer>
        </HorizontalContainer>
        {renderWayTags(props.wayPreview.wayTags)}
        <p className={styles.wayGoal}>
          {props.wayPreview.goalDescription}
        </p>
        <HorizontalContainer className={styles.ownerInfo}>
          <Link
            key={props.wayPreview.owner.name}
            path={pages.user.getPath({uuid: props.wayPreview.owner.uuid})}
            value={props.wayPreview.owner.name}
            className={styles.ownerLink}
          />
          <p>
            {props.wayPreview.owner.email}
          </p>
        </HorizontalContainer>
      </VerticalContainer>
      <VerticalContainer className={styles.additionalInfo}>
        <p>
          {`Created at ${DateUtils.getShortISODateValue(props.wayPreview.createdAt)}`}
        </p>
        {renderMentors(props.wayPreview.mentors)}
        <ProgressBar
          value={doneMetricsAmount}
          max={props.wayPreview.metricsStringified.length}
        />
      </VerticalContainer>
    </VerticalContainer>
  );
};

