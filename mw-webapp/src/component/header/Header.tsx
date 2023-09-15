import {Link} from "src/component/link/Link";
import styles from "src/component/header/Header.module.scss";
import {useAuth} from "src/utils/useAuth";
import {Button} from "src/component/button/Button";
import {pages} from "src/router/pages";

const handleGoogleSignIn = useAuth();
const BUTTON_VALUE = "Sign in with Google";
const LINK_VALUE = "Workflow";
const LOGO_TEXT = "master's way";


export const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {LOGO_TEXT.toUpperCase()}
      </h1>
      <div className={styles.block_button}>
        <Button
          onClick={handleGoogleSignIn}
          value={BUTTON_VALUE}
        />
        <Link
          path={pages.main.path}
          value={LINK_VALUE}
        />
      </div>
    </div>
  );
};
