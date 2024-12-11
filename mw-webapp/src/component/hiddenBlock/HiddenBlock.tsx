import {useEffect, useRef} from "react";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {NotificationItem, NotificationNature} from "src/component/hiddenBlock/notificationItem/NotificationItem";
import {HeadingLevel, Title} from "src/component/title/Title";
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

  /**
   * Callback triggered when scroll at the bottom and need to load more notifications
   */
  loadMore: () => void;

  /**
   * Is more notifications exists
   */
  isMoreNotificationsExist: boolean;
}

const INDEX_TO_CHECK_SCROLL_POSITION = 0.8;

/**
 * HiddenBlock component
 */
export const HiddenBlock = observer((props: HiddenBlockProps) => {
  const myRef = useRef<HTMLDivElement>(null);
  const element = myRef.current;

  /**
   * Handle scroll callback
   */
  const handleScroll = () => {
    if (element && element.scrollTop > (element.scrollHeight * INDEX_TO_CHECK_SCROLL_POSITION)) {
      props.loadMore();
    }
  };

  useEffect(() => {
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };

  }, []);

  return (
    <div
      ref={myRef}
      className={clsx(styles.hiddenBlockContainer, !props.isOpen && styles.hidden)}
    >
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
    </div>
  );
});
