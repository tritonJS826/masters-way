import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {pages} from "src/router/pages";
import {handleLogIn} from "src/utils/auth/handleLogIn";
import {handleLogOut} from "src/utils/auth/handleLogOut";
import {handleUserAuthState} from "src/utils/auth/handleUserAuthState";
import {writeNewUserCredentials} from "src/utils/auth/writeNewUserCredentials";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LINK_TEXT = "Workflow";
const LOGO_TEXT = "master's way";

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
    writeNewUserCredentials();
  }, []);

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {LOGO_TEXT.toUpperCase()}
      </h1>
      <div className={styles.block_button}>
        <Button
          onClick={user ? handleLogOut : handleLogIn}
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
