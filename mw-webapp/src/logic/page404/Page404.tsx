import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {Header, HeaderType} from "src/component/header/Header";
import {ErrorComponent} from "src/component/privateRecourse/PrivateRecourse";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";

const ERROR_404 = "404 NOT FOUND";

/**
 * Page 404 will be displayed if app's address is not correct
 */
export const Page404 = () => {
  const {user, clearUser} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;

  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <InitializedApp>
        <Header
          user={user}
          clearUser={clearUser}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          setTheme={setTheme}
          type={HeaderType.PRIMARY}
        />
        <ErrorComponent
          text={`${error.status} ${error.statusText}`}
          description=""
        />
      </InitializedApp>
    );
  }

  if (error instanceof Error) {
    return (
      <ErrorComponent
        text={error.name}
        description={error.message}
      />
    );
  }

  return (
    <ErrorComponent
      text={ERROR_404}
      description=""
    />
  );
};
