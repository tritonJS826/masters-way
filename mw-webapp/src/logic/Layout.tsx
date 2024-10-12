import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Header} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {ChatModal} from "src/logic/chat/Chat";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {SupportModal} from "src/logic/supportModal/SupportModal";

/**
 * Layout
 */
export const Layout = observer(() => {
  const {user, clearUser} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

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
      />

      <SupportModal />

      {user &&
        <ChatModal />
      }

      <Outlet />

    </InitializedApp>
  );
});
