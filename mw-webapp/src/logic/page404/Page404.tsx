import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {HeadingLevel, Title} from "src/component/title/Title";
import {InitializationApp} from "src/logic/initializationApp/InitializationApp";
import styles from "src/logic/page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

/**
 * Page 404 will be displayed if app's address is not correct
 */
export const Page404 = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <InitializationApp>
          <Header />
          <Title
            level={HeadingLevel.h2}
            className={styles.errorPageContainer}
            text={`${error.status} ${error.statusText}`}
          />
        </InitializationApp>
      </>
    );
  }

  if (error instanceof Error) {
    return (
      <>
        <Title
          level={HeadingLevel.h2}
          className={styles.errorPageContainer}
          text={error.name}
        />
        <p>
          {error.message}
        </p>
      </>
    );
  }

  return (
    <Title
      level={HeadingLevel.h2}
      className={styles.errorPageContainer}
      text={ERROR_404}
    />
  );
};
