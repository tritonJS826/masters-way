import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Header, HeaderType} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {Chat} from "src/logic/chat/Chat";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";

/**
 * Layout props
 */
interface LayoutProps {

  /**
   * HeaderType
   */
  headerType?: HeaderType;
}

/**
 * Layout
 */
export const Layout = observer((props: LayoutProps) => {
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
        type={props.headerType ?? HeaderType.PRIMARY}
      />

      {user &&
        <Chat />
      }

      <Outlet />

    </InitializedApp>
  );
});
