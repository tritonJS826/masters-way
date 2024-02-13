import {useNavigate} from "react-router-dom";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
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
  userPreview: UserPreview;
}

/**
 * UserCard component
 */
export const UserCard = (props: UserCardProps) => {
  const navigate = useNavigate();

  return (
    <a onClick={() => navigate(pages.way.getPath({uuid: props.userPreview.uuid}))}>
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
        </VerticalContainer>
        <VerticalContainer className={styles.additionalInfo}>
          <p>
            {`Created at ${DateUtils.getShortISODateValue(props.userPreview.createdAt)}`}
          </p>
          <p>
            {`${props.userPreview.ownWays.length} own ways / 
          ${props.userPreview.favoriteWays.length} favorite ways /
          ${props.userPreview.mentoringWays.length} mentoring ways`}
          </p>
        </VerticalContainer>
      </VerticalContainer>
    </a>
  );
};

