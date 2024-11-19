import {useState} from "react";
import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Header} from "src/component/header/Header";
import {HiddenBlock} from "src/component/hiddenBlock/HiddenBlock";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {NotificationEventId} from "src/eventBus/events/notification/NotificationEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatModal} from "src/logic/chat/Chat";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {SupportModal} from "src/logic/supportModal/SupportModal";
import {Notification} from "src/model/businessModel/Notification";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/Layout.module.scss";

/**
 * Layout
 */
export const Layout = observer(() => {
  const {user, clearUser} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;
  const {isNotificationOpen, setIsNotificationOpen, notificationList, unreadNotificationsAmount} = notificationStore;
  const [isConnectionEstablished, setIsConnectionEstablished] = useState(false);
  useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.CONNECTION_ESTABLISHED, () => {
    setIsConnectionEstablished(true);
  });

  useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.CONNECTION_CLOSED, () => {
    setIsConnectionEstablished(false);
  });

  useListenEventBus(ChannelId.NOTIFICATION, NotificationEventId.NOTIFICATION_RECEIVED, (payload) => {
    if (isNotificationOpen) {
      const newNotification = new Notification({
        uuid: payload.uuid,
        userUuid: payload.userUuid,
        description: payload.description,
        isRead: payload.isRead,
        createdAt: payload.createdAt,
        nature: payload.nature,
        url: payload.url,
      });
      notificationStore.addNotification(newNotification);
    } else {
      notificationStore.addUnreadNotificationToAmount();
      displayNotification({
        text: `${payload.userUuid}: ${payload.description}`,
        type: NotificationType.INFO,
      });
    }
  });

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
        isConnectionEstablished={isConnectionEstablished}
      />

      <SupportModal />

      {user &&
        <ChatModal />
      }

      <HorizontalContainer className={styles.pageLayout}>
        {user &&
        <HiddenBlock
          title={LanguageService.common.notifications.title[language]}
          notificationList={notificationList}
          isOpen={isNotificationOpen}
        />
        }

        <Outlet />
      </HorizontalContainer>

    </InitializedApp>
  );
});
