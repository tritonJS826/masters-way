import {NavLink} from "src/component/link/Link";
import styles from "src/component/header/Header.module.scss";
import {useAuth} from "src/utils/useAuth";
import {Button} from "src/component/button/Button";
import {pages} from "src/router/pages";

const handleGoogleSignIn = useAuth();
const buttonValue = "Sign in with Google";
const linkValue = "Workflow";
const logo = "master-way";


export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        {logo.toUpperCase()}
      </div>
      <div className={styles.block_button}>
        <Button
          onClick={handleGoogleSignIn}
          value={buttonValue}
        />
        <NavLink
          path={pages.main.path}
          value={linkValue}
        />
      </div>
    </div>
  );
};
