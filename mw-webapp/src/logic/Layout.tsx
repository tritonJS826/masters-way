import {Outlet} from "react-router-dom";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {observer} from "mobx-react-lite";
import {Chat} from "src/component/chat/Chat";
import {Header} from "src/component/header/Header";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {LanguageService} from "src/service/LanguageService";

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

      {user &&
        <Chat
          triggerText={LanguageService.common.chat.openChat[language]}
          chatTitle={LanguageService.common.chat.messengerTitle[language]}
          contactsTitle={LanguageService.common.chat.contactsTitle[language]}
        />
      }

      <Outlet />

    </InitializedApp>
  );
});
