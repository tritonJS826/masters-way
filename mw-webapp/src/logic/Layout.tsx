import {useState} from "react";
import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Header} from "src/component/header/Header";
import {HiddenBlock} from "src/component/hiddenBlock/HiddenBlock";
import {NotificationNature} from "src/component/hiddenBlock/notificationItem/NotificationItem";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {NotificationDAL} from "src/dataAccessLogic/NotificationDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatModal} from "src/logic/chat/Chat";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {SupportModal} from "src/logic/supportModal/SupportModal";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/Layout.module.scss";

const DEFAULT_NOTIFICATIONS_PAGINATION_VALUE = 1;

/**
 * Layout
 */
export const Layout = observer(() => {
  const {user, clearUser} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;
  const {isNotificationOpen, setIsNotificationOpen, notificationList, unreadNotificationsAmount} = notificationStore;

  const [notificationsPagination, setNotificationsPagination] = useState<number>(DEFAULT_NOTIFICATIONS_PAGINATION_VALUE);
  // Const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);
  // useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.CONNECTION_ESTABLISHED, () => {
  //   setIsConnectionEstablished(true);
  // });

  // useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.CONNECTION_CLOSED, () => {
  //   setIsConnectionEstablished(false);
  // });

  // useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.NOTIFICATION_RECEIVED, (payload) => {
  //   if (isNotificationOpen) {
  //     const newNotification = new Notification({
  //       uuid: payload.uuid,
  //       userUuid: payload.userUuid,
  //       description: payload.description,
  //       isRead: payload.isRead,
  //       createdAt: payload.createdAt,
  //       nature: payload.nature,
  //       url: payload.url,
  //     });
  //     notificationStore.addNotification(newNotification);
  //   } else {
  //     notificationStore.addUnreadNotificationToAmount();
  //     displayNotification({
  //       text: `${payload.userUuid}: ${payload.description}`,
  //       type: NotificationType.INFO,
  //     });
  //   }
  // });

  /**
   * Load more notifications
   */
  const loadMoreNotifications = async () => {
    const nextPage = notificationsPagination + DEFAULT_NOTIFICATIONS_PAGINATION_VALUE;

    const notifications = await NotificationDAL.getOwnNotificationList({page: nextPage});
    notificationStore.addNotifications(notifications.notificationList);
    setNotificationsPagination(nextPage);
  };

  const isMoreNotificationsExist = !!(notificationStore.notificationList
    && notificationStore.notificationList.length < notificationStore.allNotificationsAmount);

  return (
    <InitializedApp>
      <Header
        user={user}
        clearUser={clearUser}
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        dataCy={headerAccessIds.header}
        openNotificationBlock={(isOpen: boolean) => setIsNotificationOpen(isOpen)}
        unreadNotificationsAmount={unreadNotificationsAmount}
        isNotificationBlockOpen={isNotificationOpen}
        isConnectionEstablished={false}
      />

      <SupportModal />

      {user &&
        <ChatModal />
      }

      <HorizontalContainer className={styles.pageLayout}>
        {user &&
        <HiddenBlock
          title={LanguageService.common.notifications.title[language]}
          getTitle={(nature: NotificationNature) => LanguageService.notifications.nature[nature][language]}
          notificationList={notificationList}
          isOpen={isNotificationOpen}
          onClick={async (notificationId: string, isRead: boolean) => {
            !isRead && notificationStore.deleteUnreadNotificationFromAmount();
            !isRead && await NotificationDAL.updateNotification(notificationId);
          }}
          loadMore={loadMoreNotifications}
          isMoreNotificationsExist={isMoreNotificationsExist}
        />
        }

        <Outlet />
      </HorizontalContainer>

    </InitializedApp>
  );
});
