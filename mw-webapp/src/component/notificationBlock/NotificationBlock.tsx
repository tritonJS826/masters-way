import {useEffect, useState} from "react";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {NotificationItem, NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";
import {Select} from "src/component/select/Select";
import {Separator} from "src/component/separator/Separator";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {usePersistanceState} from "src/hooks/usePersistanceState";
import {useScroll} from "src/hooks/useScroll";
import {Notification} from "src/model/businessModel/Notification";
import {LanguageService} from "src/service/LanguageService";
import {NotificationBlockSettings} from "src/utils/LocalStorageWorker";
import styles from "src/component/notificationBlock/NotificationBlock.module.scss";

/**
 * Available notification statuses
 */
export const NotificationStatus = {
  isOnlyNew: "isOnlyNew",
  all: "all",
} as const;

const HEIGHT_FOR_SCROLL_CALLBACK_FROM_BOTTOM = 1000;

export const DEFAULT_NOTIFICATION_BLOCK_SETTINGS: NotificationBlockSettings = {

  /**
   * Default goalMetrics block is opened
   * @default true
   */
  isOnlyNew: true,

};

/**
 * Notification block props
 */
interface NotificationBlockProps {

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
  loadMore: (isOnlyNew: boolean) => Promise<void>;

  /**
   * Is more notifications exists
   */
  isMoreNotificationsExist: boolean;

  /**
   * Total notifications amount
   */
  totalNotificationsAmount: number;
}

/**
 * Notification block component
 */
export const NotificationBlock = observer((props: NotificationBlockProps) => {
  const {language} = languageStore;
  const [notificationBlockSettings,, updateNotificationBlockSettings] = usePersistanceState({
    key: "notificationBlock",
    defaultValue: DEFAULT_NOTIFICATION_BLOCK_SETTINGS,
  });
  const [isHandleScrollInProgress, setHandleSCrollInProgress] = useState(false);

  /**
   * Load more notifications
   */
  const loadMoreNotifications = async () => {
    setHandleSCrollInProgress(true);
    await Promise.resolve(props.loadMore(notificationBlockSettings.isOnlyNew));
    setHandleSCrollInProgress(false);
  };

  const {ref} = useScroll({

    /**
     * Callback triggered onScroll
     */
    onScroll: () => loadMoreNotifications(),
    isDisabled: !props.isMoreNotificationsExist,
    isHandleSCrollInProgress: isHandleScrollInProgress,
    heightFromBottomBlock: HEIGHT_FOR_SCROLL_CALLBACK_FROM_BOTTOM,
    dependency: [isHandleScrollInProgress, props.notificationList, notificationBlockSettings.isOnlyNew],
  });

  /**
   * Load notifications
   */
  const loadNotifications = async () => {
    const notifications = await notificationStore.loadNotifications(notificationBlockSettings.isOnlyNew);
    notificationStore.setUnreadNotificationsAmount(notifications.unreadSize);
    notificationStore.setTotalNotificationsAmount(notifications.totalSize);
    notificationStore.setNotifications(notifications.notificationList);
  };

  useEffect(() => {
    loadNotifications();

  }, [notificationBlockSettings.isOnlyNew]);

  return (
    <div
      ref={ref}
      className={clsx(styles.hiddenBlockContainer, !props.isOpen && styles.hidden)}
    >
      <Select
        defaultValue={notificationBlockSettings.isOnlyNew ? NotificationStatus.isOnlyNew : NotificationStatus.all}
        name="filterNotifications"
        options={[
          {
            id: "1",
            value: NotificationStatus.all,
            text: LanguageService.notifications.filter.allNotifications[language],
          },
          {
            id: "2",
            value: NotificationStatus.isOnlyNew,
            text: LanguageService.notifications.filter.unreadNotifications[language],
          },
        ]}
        onChange={(value) => updateNotificationBlockSettings({isOnlyNew: value === NotificationStatus.isOnlyNew ? true : false})}
      />
      <Separator className={styles.separator} />
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
