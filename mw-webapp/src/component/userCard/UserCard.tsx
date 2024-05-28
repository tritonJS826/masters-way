import {observer} from "mobx-react-lite";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Skill} from "src/component/userCard/skill/Skill";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {UserNotSaturatedWay, UserTag} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import {DateUtils} from "src/utils/DateUtils";
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
   * Render way tags
   */
  const renderUserTags = (skills: UserTag[]) => {
    return (
      <HorizontalContainer className={styles.userTags}>
        {skills.map((skill) => (
          <Skill
            key={skill.uuid}
            skillName={skill.name}
          />
        ))
        }
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
        <VerticalContainer className={styles.mainInfo}>
          <HorizontalContainer className={styles.nameLikes}>
            <HorizontalContainer className={styles.avatarNameContainer}>
              <Avatar
                alt={props.userPreview.name}
                src={props.userPreview.imageUrl}
                size={AvatarSize.BIG}
              />
              <VerticalContainer className={styles.nameGroup}>
                <Title
                  text={props.userPreview.name}
                  level={HeadingLevel.h3}
                  className={styles.title}
                  placeholder=""
                />
                <p className={styles.mail}>
                  {props.userPreview.email}
                </p>
              </VerticalContainer>
            </HorizontalContainer>
            <HorizontalContainer className={styles.likes}>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content={LanguageService.allUsers.userCard.likes[language]}
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"StarIcon"}
                  className={styles.icon}
                />
                {props.userPreview.favoriteForUsers}
              </Tooltip>
            </HorizontalContainer>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={props.userPreview.description}
          >
            <p className={styles.description}>
              {props.userPreview.description}
            </p>
          </Tooltip>
          {renderUserTags(props.userPreview.tags)}
        </VerticalContainer>

        <VerticalContainer className={styles.additionalInfo}>
          <p>
            {`${LanguageService.allUsers.userCard.createdAt[language]}
            ${DateUtils.getShortISODateValue(props.userPreview.createdAt)}`}
          </p>
          <p>
            {`${LanguageService.allUsers.userCard.ownWays[language]} (${props.userPreview.ownWays}) 
          ${LanguageService.allUsers.userCard.favoriteWays[language]} (${props.userPreview.favoriteWays})
          ${LanguageService.allUsers.userCard.mentoringWays[language]} (${props.userPreview.mentoringWays})`}
          </p>
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
});

