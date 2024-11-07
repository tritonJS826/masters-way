import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Header} from "src/component/header/Header";
import {HiddenBlock} from "src/component/hiddenBlock/HiddenBlock";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatModal} from "src/logic/chat/Chat";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {SupportModal} from "src/logic/supportModal/SupportModal";
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
