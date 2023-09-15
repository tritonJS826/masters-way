import {Link} from "src/component/link/Link";
import styles from "src/component/header/Header.module.scss";
import {Button} from "src/component/button/Button";
import {pages} from "src/router/pages";
import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {writeNewUserCredentials} from "src/utils/auth/writeNewUserCredentials";
import {handleUserAuthState} from "src/utils/auth/handleUserAuthState";
import {handleLogOut} from "src/utils/auth/handleLogOut";
import {handleLogIn} from "src/utils/auth/handleLogIn";

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
