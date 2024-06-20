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
import {
  UserNotSaturatedWay,
  UserTag,
} from "src/model/businessModelPreview/UserNotSaturatedWay";
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
          <Tag
            key={skill.uuid}
            tagName={skill.name}
            type={TagType.CARD_TAG}
          />
        ))}
      </HorizontalContainer>
    );
  };

  /**
   * The render Description function processes the description text to find markdown-style
   * links and convert them into
   * clickable anchor tags.
   */
  const renderDescription = (description: string) => {
    const linkPattern = /\[([^\]]*)]\((https?:\/\/[^)]+)\)/g;
    const urlGroupIndex = 2;
    const urlGroupNumber = 1;

    const parts = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkPattern.exec(description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(description.substring(lastIndex, match.index));
      }
      let linkText = match[urlGroupNumber];
      if (linkText.startsWith("**") && linkText.endsWith("**")) {
        linkText = linkText.slice(urlGroupIndex, -urlGroupIndex);
      }

      parts.push(
        <p key={match.index}>
          {linkText || match[urlGroupIndex]}
          {" "}
        </p>,
      );
      lastIndex = linkPattern.lastIndex;
    }

    if (lastIndex < description.length) {
      parts.push(description.substring(lastIndex));
    }

    return (
      <p className={styles.description}>
        {parts}
      </p>
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
            <VerticalContainer className={styles.likes}>
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
            </VerticalContainer>
          </HorizontalContainer>
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={renderDescription(props.userPreview.description)}
          >
            {renderDescription(props.userPreview.description)}
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
