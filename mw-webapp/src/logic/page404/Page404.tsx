import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {HeadingLevel, Title} from "src/component/title/Title";
import {InitializedApp} from "src/logic/initializedApp/InitializedApp";
import styles from "src/logic/page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

/**
 * Page 404 will be displayed if app's address is not correct
 */
export const Page404 = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <InitializedApp>
        <Header />
        <Title
          level={HeadingLevel.h1}
          className={styles.errorPageContainer}
          text={`${error.status} ${error.statusText}`}
        />
      </InitializedApp>
    );
  }

  if (error instanceof Error) {
    return (
      <>
        <Title
          level={HeadingLevel.h1}
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
      level={HeadingLevel.h1}
      className={styles.errorPageContainer}
      text={ERROR_404}
    />
  );
};
