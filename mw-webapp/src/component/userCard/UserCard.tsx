import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {UserСardTag} from "src/component/userCard/userTag/UserTag";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserNotSaturatedWay, UserTag} from "src/model/businessModelPreview/UserNotSaturatedWay";
import {pages} from "src/router/pages";
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
export const UserCard = (props: UserCardProps) => {

  /**
   * Render way tags
   */
  const renderUserTags = (wayTags: UserTag[]) => {
    return (
      <HorizontalContainer className={styles.userTags}>
        {wayTags.map((wayTag) => (
          <UserСardTag
            key={wayTag.uuid}
            tagName={wayTag.name}
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
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.userPreview.name}
            >
              <Title
                text={props.userPreview.name}
                level={HeadingLevel.h3}
                className={styles.title}
              />
            </Tooltip>
            <HorizontalContainer className={styles.likes}>
              <Tooltip
                position={PositionTooltip.BOTTOM}
                content="Likes"
              >
                <Icon
                  size={IconSize.SMALL}
                  name={"StarIcon"}
                  className={styles.icon}
                />
                {props.userPreview.favoriteForUserUuids.length}
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
          <p className={styles.mail}>
            {props.userPreview.email}
          </p>
          {renderUserTags(props.userPreview.tags)}
        </VerticalContainer>

        <VerticalContainer className={styles.additionalInfo}>
          <p>
            {`Created at ${DateUtils.getShortISODateValue(props.userPreview.createdAt)}`}
          </p>
          <p>
            {`${props.userPreview.ownWays} own ways / 
          ${props.userPreview.favoriteWays} favorite ways /
          ${props.userPreview.mentoringWays} mentoring ways`}
          </p>
        </VerticalContainer>
      </VerticalContainer>
    </Link>
  );
};

