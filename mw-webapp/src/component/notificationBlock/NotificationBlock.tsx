import {useEffect, useState} from "react";
import clsx from "clsx";
import {observer} from "mobx-react-lite";
import {NotificationItem, NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";
import {Select} from "src/component/select/Select";
import {Separator} from "src/component/separator/Separator";
import {NotificationDAL} from "src/dataAccessLogic/NotificationDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {usePersistenceState} from "src/hooks/usePersistenceState";
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
const DEFAULT_NOTIFICATIONS_PAGINATION_VALUE = 1;
const PAGINATION_INCREMENT = 1;

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
  const [notificationBlockSettings,, updateNotificationBlockSettings] = usePersistenceState({
    key: "notificationBlock",
    defaultValue: DEFAULT_NOTIFICATION_BLOCK_SETTINGS,

    /**
     * Check is stored data valid
     */
    storedDataValidator: (currentSettings: NotificationBlockSettings) => {
      return typeof currentSettings.isOnlyNew === "boolean";
    },
  });
  const [isHandleScrollInProgress, setHandleSCrollInProgress] = useState(false);
  const [notificationsPagination, setNotificationsPagination] = useState<number>(DEFAULT_NOTIFICATIONS_PAGINATION_VALUE);

  /**
   * Reset pagination to the first page
   */
  const resetPagination = () => {
    setNotificationsPagination(DEFAULT_NOTIFICATIONS_PAGINATION_VALUE);
  };

  /**
   * Load more notifications on scroll
   */
  const loadMoreNotifications = async () => {
    setHandleSCrollInProgress(true);
    try {
      const nextPage = notificationsPagination + PAGINATION_INCREMENT;
      const notifications = await NotificationDAL.getOwnNotificationList({
        page: nextPage,
        isOnlyNew: notificationBlockSettings.isOnlyNew,
      });
      notificationStore.addNotifications(notifications.notificationList);
      setNotificationsPagination(nextPage);
    } finally {
      setHandleSCrollInProgress(false);
    }
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
    resetPagination();
    const notifications = await notificationStore.loadNotifications(notificationBlockSettings.isOnlyNew);
    notificationStore.setUnreadNotificationsAmount(notifications.unreadSize);
    notificationStore.setTotalNotificationsAmount(notifications.totalSize);
    notificationStore.setNotifications(notifications.notificationList);
  };

  /**
   * Handle click on a notification - mark as read but don't reset pagination
   */
  const handleNotificationClick = async (notificationId: string, isRead: boolean) => {
    if (!isRead) {
      notificationStore.deleteUnreadNotificationFromAmount();
      await NotificationDAL.updateNotification(notificationId);
    }
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
          key={notificationItem.uuid}
          title={props.getTitle(notificationItem.nature)}
          nature={notificationItem.nature}
          description={notificationItem.description}
          originalUrl={notificationItem.url}
          isNotificationRead={!notificationItem.isRead}
          onClick={() => {
            handleNotificationClick(notificationItem.uuid, notificationItem.isRead);
            !notificationItem.isRead && notificationItem.updateIsRead(true);
          }}
        />
      ))}
    </div>
  );
});
