import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {NotificationItem, NotificationNature} from "src/component/hiddenBlock/notificationItem/NotificationItem";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Notification} from "src/model/businessModel/Notification";
import styles from "src/component/hiddenBlock/HiddenBlock.module.scss";

/**
 * Hidden block props
 */
interface HiddenBlockProps {

  /**
   * Hidden block title
   */
  title: string;

  /**
   * Hidden block notificationList
   */
  notificationList: Notification[] | null;

  /**
   * Class name for Hidden block
   */
  className?: string;

  /**
   * Hidden block id shown if true
   * @default false
   */
  isOpen?: boolean;

  /**
   * Get title for notification to show
   */
  getTitle: (notificationNature: NotificationNature) => string;

  /**
   * Callback triggered when notification clicked
   */
  onClick: (notificationId: string, isRead: boolean) => void;
}

/**
 * HiddenBlock component
 */
export const HiddenBlock = observer((props: HiddenBlockProps) => {

  return (
    <VerticalContainer className={clsx(styles.hiddenBlockContainer, !props.isOpen && styles.hidden)}>
      <Title
        level={HeadingLevel.h2}
        text={props.title}
        placeholder=""
      />
      {props.isOpen && props.notificationList?.map((notificationItem) => (
        <NotificationItem
          key={notificationItem.description}
          title={props.getTitle(notificationItem.nature)}
          nature={notificationItem.nature}
          description={notificationItem.description}
          originalUrl={notificationItem.url}
          isNotificationRead={!notificationItem.isRead}
          onClick={() => {
            props.onClick(notificationItem.uuid, notificationItem.isRead);
            !notificationItem.isRead && notificationItem.updateIsRead(true);
          }}
        />
      ))}
    </VerticalContainer>
  );
});
