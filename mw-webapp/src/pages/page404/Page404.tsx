import {HeadingLevel, Title} from "src/component/title/Title";
import styles from "src/pages/page404/Page404.module.scss";

const ERROR_404 = "404 NOT FOUND";

/**
 * Page 404
 * @returns {JSX.Element}
 */
export const Page404 = (): JSX.Element => {
  return (
    <Title
      level={HeadingLevel.h2}
      className={styles.errorPageContainer}
      text={ERROR_404}
    />
  );
};