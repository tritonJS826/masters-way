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
import {useGlobalContext} from "src/GlobalContext";
import {UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LangauageService";
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
  const {language} = useGlobalContext();

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
  const renderMentors = (mentors: UserPlain[]) => {
    return (
      <HorizontalContainer className={styles.mentors}>
        <p>
          {mentors.length
            ? `${LanguageService.allWays.wayCard.mentor[language]}`
            : `${LanguageService.allWays.wayCard.noMentors[language]}`}
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
                content={LanguageService.allWays.wayCard.reports[language]}
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
                content={LanguageService.allWays.wayCard.likes[language]}
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
              {`${LanguageService.allWays.wayCard.createdAt[language]} 
              ${DateUtils.getShortISODateValue(props.wayPreview.createdAt)}`}
            </p>
            <p>
              {`${LanguageService.allWays.wayCard.updatedAt[language]} 
              ${DateUtils.getShortISODateValue(props.wayPreview.lastUpdate)}`}
            </p>
          </HorizontalContainer>
          <HorizontalContainer className={styles.people}>
            {LanguageService.allWays.wayCard.owner[language]}
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.wayPreview.owner.name}
            >
              <Avatar
                alt={props.wayPreview.owner.name}
                src={props.wayPreview.owner.imageUrl}
              />
            </Tooltip>
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

