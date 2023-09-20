import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {pages} from "src/router/pages";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import {userAuthState} from "src/service/auth/userAuthState";
import {writeNewUserCredentials} from "src/service/auth/writeNewUserCredentials";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LINK_TEXT = "Workflow";
const LOGO_TEXT = "master's way";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    userAuthState(setUser);
    writeNewUserCredentials();
  }, []);
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {LOGO_TEXT.toUpperCase()}
      </h1>
      <div className={styles.block_button}>
        <Button
          onClick={user ? logOut : logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
        />
        <Link
          path={pages.main.path}
          value={LINK_TEXT}
        />
      </div>
    </div>
  );
};
