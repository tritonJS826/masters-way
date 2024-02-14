import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {HeadingLevel, Title} from "src/component/title/Title";
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
        <div className={styles.errorPageContainer}>
          <p>
            {error.status}
          </p>
          <p>
            {error.statusText}
          </p>
        </div>
      </>
    );
  }

  if (error instanceof Error) {
    return (
      <div className={styles.errorPageContainer}>
        <Title
          level={HeadingLevel.h2}
          className={styles.errorPageContainer}
          text={error.message ?? ERROR_404}
        />
      </div>
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
