import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/hiddenBlock/notificationItem/NotificationItem.module.scss";

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
 * NotificationItem component
 */
export const NotificationItem = (props: NotificationItemProps) => {
  const navigate = useNavigate();

  /**
   * Url parser
   */
  const urlParser = (url: string, nature: NotificationNature) => {
    const path = new URL(url).pathname;

    switch (nature) {
      case "own_way":
        navigate(path);
        break;
      default:
        return null;
    }
  };

  return (
    <VerticalContainer
      className={clsx(styles.notificationItem, props.isNotificationRead && styles.notRead, props.className)}
      onClick={() => {
        urlParser(props.originalUrl, props.nature);
        props.onClick();
      }}
    >
      <HorizontalContainer className={styles.notificationBlock}>
        <VerticalContainer className={styles.notificationTexts}>
          <Title
            level={HeadingLevel.h3}
            text={props.title}
            placeholder=""
          />
          <div className={styles.notificationDescription}>
            {props.description}
          </div>
        </VerticalContainer>
        <Icon
          name="ArrowRightIcon"
          size={IconSize.SMALL}
        />
      </HorizontalContainer>
    </VerticalContainer>
  );
};
