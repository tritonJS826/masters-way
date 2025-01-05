import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Link} from "src/component/link/Link";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/notificationBlock/notificationItem/NotificationItem.module.scss";

/**
 * Nature of the notification (like jobDone created, mentor request applied etc.)
 */
export enum NotificationNature {
  private_chat = "private_chat",
  group_chat = "group_chat",
  own_way = "own_way",
  mentoring_way = "mentoring_way",
  mentoring_request = "mentoring_request",
  favorite_way = "favorite_way",
}

/**
 * Notification item props
 */
export interface NotificationItemProps {

  /**
   * Notification title
   */
  title: string;

  /**
   * Notification nature
   */
  nature: NotificationNature;

  /**
   * Notification description
   */
  description: string;

  /**
   * Url to the updated entity from notification
   */
  originalUrl: string;

  /**
   * Additional classNme
   */
  className?: string;

  /**
   * Additional classNme
   */
  isNotificationRead: boolean;

  /**
   * Callback triggered when notification clicked
   */
  onClick: () => void;
}

/**
 * Url parser
 */
const urlParser = (
  url: string,
  nature: NotificationNature,
) => {
  const path = new URL(url).pathname;
  switch (nature) {
    case "own_way":
      return path;
    default:
      // TODO if something wrong maybe it is better to navigate to error page
      displayNotification({
        text: "Ups! Url does not exist",
        type: NotificationType.ERROR,
      });

      return "";
  }
};

/**
 * NotificationItem component
 */
export const NotificationItem = (props: NotificationItemProps) => {
  const url = urlParser(props.originalUrl, props.nature);
  const isUrlWillTransfer = url !== window.location.pathname;

  return (
    <Link
      path={url}
      className={styles.notificationLink}
    >
      <VerticalContainer
        className={clsx(styles.notificationItem, props.isNotificationRead && styles.notRead, props.className)}
        onClick={() => props.onClick()}
      >
        <HorizontalContainer className={styles.notificationBlock}>
          <VerticalContainer className={styles.notificationTexts}>
            <Title
              level={HeadingLevel.h3}
              text={props.title}
              placeholder=""
            />
            <Tooltip
              position={PositionTooltip.BOTTOM}
              content={props.description}
            >
              <div className={styles.notificationDescription}>
                {props.description}
              </div>
            </Tooltip>
          </VerticalContainer>
          {isUrlWillTransfer
            ? (
              <Icon
                name="ArrowRightIcon"
                size={IconSize.SMALL}
              />
            )
            : (
              <div className={styles.spaceForArrow} />
            )}
        </HorizontalContainer>
      </VerticalContainer>
    </Link>
  );
};
