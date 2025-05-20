import {allUsersAccessIds} from "cypress/accessIds/allUsersAccessIds";
import {observer} from "mobx-react-lite";
import {Tag, TagType} from "src/component//tag/Tag";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {Skill} from "src/model/businessModel/User";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
import {renderMarkdown} from "src/utils/markdown/renderMarkdown";
import {Symbols} from "src/utils/Symbols";
import styles from "src/component/userCard/UserCard.module.scss";

/**
 * User card props
 */
interface UserCardProps {

  /**
   * User preview
   */
  userPreview: UserNotSaturatedWay;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * UserCard component
 */
export const UserCard = observer((props: UserCardProps) => {
  const {language} = languageStore;

  /**
   * Render skills
   */
  const renderSkills = (skills: Skill[]) => {
    return (
      <HorizontalContainer className={styles.skills}>
        {skills.map((skill) => (
          <Tag
            key={skill.uuid}
            tagName={skill.name}
            type={TagType.CARD_TAG}
          />
        ))}
      </HorizontalContainer>
    );
  };

  return (
    <Link
      path={pages.user.getPath({uuid: props.userPreview.uuid})}
      className={styles.cardLink}
      dataCy={props.dataCy}
    >
      <VerticalContainer className={styles.userCardContainer}>
        {props.userPreview.isMentor && (
          <Icon
            size={IconSize.MEDIUM}
            name="FlagIcon"
            className={styles.flagMentor}
            dataCy={allUsersAccessIds.allUsersCard.mentorFlag}
          />
        )}
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <HorizontalContainer className={styles.avatarName}>
              <Avatar
                alt={props.userPreview.name}
                src={props.userPreview.imageUrl}
                size={AvatarSize.MEDIUM}
                className={styles.avatar}
              />
              <Title
                text={props.userPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
                placeholder=""
              />
            </HorizontalContainer>
            <VerticalContainer>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={LanguageService.allUsers.userCard.likes[language]}
              >
                <HorizontalContainer className={styles.likes}>
                  <Icon
                    size={IconSize.SMALL}
                    name={"StarIcon"}
                    className={styles.icon}
                  />
                  <span>
                    {props.userPreview.favoriteForUsers}
                  </span>
                </HorizontalContainer>
              </Tooltip>
            </VerticalContainer>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={renderMarkdown(props.userPreview.description)}
          >
            <p className={styles.description}>
              {renderMarkdown(props.userPreview.description)}
            </p>
          </Tooltip>
          {renderSkills(props.userPreview.tags)}
        </VerticalContainer>

        <VerticalContainer className={styles.additionalInfo}>
          <HorizontalContainer>
            <span>
              {`${LanguageService.allUsers.userCard.createdAt[language]}`}
            </span>
            <span className={styles.createdAt}>
              {DateUtils.getShortISODotSplitted(props.userPreview.createdAt)}
            </span>
          </HorizontalContainer>
          <HorizontalContainer className={styles.ways}>
            <span>
              {`${LanguageService.allUsers.userCard.ownWays[language]}${Symbols.NO_BREAK_SPACE}(${props.userPreview.ownWays})`}
            </span>
            <span>
              {`${LanguageService.allUsers.userCard.favoriteWays[language]}${Symbols.NO_BREAK_SPACE}` +
                `(${props.userPreview.favoriteWays})`}
            </span>
            <span>
              {`${LanguageService.allUsers.userCard.mentoringWays[language]}${Symbols.NO_BREAK_SPACE}` +
                `(${props.userPreview.mentoringWays})`}
            </span>
          </HorizontalContainer>
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
});
