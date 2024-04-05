import {Outlet} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {FirebaseAnalytics} from "src/FirebaseAnalytics";
import {useGlobalContext} from "src/GlobalContext";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";

/**
 * Layout
 */
export const Layout = () => {
  const {user, language, setLanguage, theme, setTheme} = useGlobalContext();

  return (
    <InitializedApp>
      <Header
        language={language}
        setLanguage={setLanguage}
        user={user}
        currentTheme={theme}
        setTheme={setTheme}
      />
      <Outlet />
      <FirebaseAnalytics />
    </InitializedApp>
  );
};
