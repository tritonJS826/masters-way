import {HeadingLevel, Title} from "src/component/title/Title";
import styles from "src/logic/redirectPage/RedirectPage.module.scss";

const REDIRECT_CONTENT = "You tried to navigate to a page that you do not have access to. Register to continue";

/**
 * Redirect page
 */
export const RedirectPage = () => {
  return (
    <Title
      level={HeadingLevel.h2}
      className={styles.redirectPageContainer}
      text={REDIRECT_CONTENT}
    />
  );
};