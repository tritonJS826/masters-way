import MarkdownLib, {Components} from "react-markdown";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import remarkGfm from "remark-gfm";
import {Avatar} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {Tag, TagType} from "src/component/tag/Tag";
import {Text} from "src/component/text/Text";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {WayStatus} from "src/logic/waysTable/wayStatus";
import {UserPlain} from "src/model/businessModel/User";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";
import {WayTag} from "src/model/businessModelPreview/WayTag";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import styles from "src/component/wayCard/WayCard.module.scss";

/**
 * Custom markdown renderer for wayGoal that doesn't apply link styling
 * This allows links to inherit the wayGoal's secondaryTextColor
 */
const renderWayGoalMarkdown = (text: string | number) => {
  const customComponents: Components = {

    /**
     * Custom anchor element without styling
     */
    a: ({children, ...params}) => (
      <a
        {...params}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children ?? LanguageService.common.emptyLinkTitle[languageStore.language]}
      </a>
    ),

    /**
     * Custom image element
     */
    img: (params) => (
      <span>
        <Image
          src={params.src ?? ""}
          alt={params.alt ?? ""}
          isZoomable
        />
      </span>
    ),
  };

  return (
    <MarkdownLib
      remarkPlugins={[remarkGfm]}
      components={customComponents}
    >
      {typeof text === "number" ? text.toString() : text}
    </MarkdownLib>
  );
};

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
export const WayCard = observer((props: WayCardProps) => {
  const {language} = languageStore;

  /**
   * Render way tags
   */
  const renderWayTags = (wayTags: WayTag[]) => {
    return (
      <HorizontalContainer className={styles.wayTags}>
        {wayTags.map((wayTag) => (
          <Tag
            tagName={wayTag.name}
            key={wayTag.uuid}
            type={TagType.CARD_TAG}
          />
        ))}
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
        ))}
      </HorizontalContainer>
    );
  };

  const isCompositeWay = props.wayPreview.childrenUuids.length !== 0;
  const isAbandonedWay = props.wayPreview.status === WayStatus.abandoned;

  return (
    <Link
      path={pages.way.getPath({uuid: props.wayPreview.uuid})}
      className={styles.cardLink}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.wayCardContainer}>
        <VerticalContainer className={clsx(
          styles.mainInfo,
          isCompositeWay && styles.mainInfoCompositeWay,
          isAbandonedWay && styles.abandonedWay,
        )}
        >
          <HorizontalContainer className={styles.nameLikes}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.wayPreview.name}
            >
              <Title
                text={props.wayPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
                isClamped={true}
                placeholder={LanguageService.common.emptyMarkdown[language]}
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
            content={renderWayGoalMarkdown(props.wayPreview.goalDescription)}
          >
            <div className={styles.wayGoal}>
              {renderWayGoalMarkdown(props.wayPreview.goalDescription)}
            </div>
          </Tooltip>
          {renderWayTags(props.wayPreview.wayTags)}
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer className={styles.dates}>
            <HorizontalContainer className={styles.dateText}>
              {LanguageService.allWays.wayCard.createdAt[language]}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.wayPreview.createdAt)}
              </span>
            </HorizontalContainer>
            <HorizontalContainer className={styles.dateText}>
              {LanguageService.allWays.wayCard.updatedAt[language]}
              <span className={styles.dateValue}>
                {DateUtils.getShortISODotSplitted(props.wayPreview.lastUpdate)}
              </span>
            </HorizontalContainer>
          </HorizontalContainer>
          <HorizontalContainer className={styles.people}>
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.wayPreview.owner.name}
            >
              <HorizontalContainer className={styles.owner}>
                <Avatar
                  alt={props.wayPreview.owner.name}
                  src={props.wayPreview.owner.imageUrl}
                  className={styles.avatar}
                />
                <Text text={props.wayPreview.owner.name} />
              </HorizontalContainer>
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
});
