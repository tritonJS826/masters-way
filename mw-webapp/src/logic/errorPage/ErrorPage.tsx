import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {Button, ButtonType} from "src/component/button/Button";
import {ErrorComponent} from "src/component/errorComponent/ErrorComponent";
import {Header} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Image} from "src/component/image/Image";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {notificationStore} from "src/globalStore/NotificationStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {userStore} from "src/globalStore/UserStore";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/errorPage/ErrorPage.module.scss";

const ERROR_404 = "404 NOT FOUND";

/**
 * Error page will be displayed if app's address is not correct
 */
export const ErrorPage = () => {
  const {user, clearUser} = userStore;
  const {language, setLanguage} = languageStore;
  const {theme, setTheme} = themeStore;
  const {isNotificationOpen, unreadNotificationsAmount, setIsNotificationOpen} = notificationStore;
  const navigate = useNavigate();
  const navigateBackButton = -1;

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
          openNotificationBlock={() => setIsNotificationOpen(true)}
          unreadNotificationsAmount={unreadNotificationsAmount}
          isNotificationBlockOpen={isNotificationOpen}
          isConnectionEstablished={false}
        />
        <VerticalContainer className={styles.inner}>
          <Title
            level={HeadingLevel.h1}
            text={`${error.status} ${error.statusText}`}
            placeholder=""
          />
          <HorizontalContainer className={styles.buttonGroup}>
            <Button
              onClick={() => navigate(pages.home.getPath({}))}
              buttonType={ButtonType.PRIMARY}
              value={LanguageService.common.button.home[language]}
            />
            <Button
              onClick={() => navigate(navigateBackButton)}
              buttonType={ButtonType.SECONDARY}
              value={LanguageService.common.button.back[language]}
            />
          </HorizontalContainer>
          <Image
            alt="three сircle"
            src={"https://drive.google.com/thumbnail?id=1H1LY6mbpgioMLS95qKRP6aNFAvFQIOCB&sz=w1000"}
            className={styles.imageBackground}
          />
        </VerticalContainer>
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
