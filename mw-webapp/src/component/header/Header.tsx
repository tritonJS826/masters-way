import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {pages} from "src/router/pages";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LINK_TEXT = "Workflow";
const LOGO_TEXT = "master's way";

/**
 * Header component
 */
export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {LOGO_TEXT.toUpperCase()}
      </h1>
      {user && <h2 className={styles.title}>
        Hello,
        {" "}
        {user.displayName}
        !
      </h2>}
      {/* //TODO: we need delete this navigate after main features about dayReports table will be finished */}
      {user && <Navigate to={pages.way.path("uuid")} />}
      <div className={styles.blockButton}>
        <Button
          onClick={user ? logOut : logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
        />
        {/* //TODO: we need delete this link when after sidebar with all links to al pages will be added */}
        <Link
          path={pages.way.path("uuid")}
          value={LINK_TEXT}
        />
      </div>
    </div>
  );
};