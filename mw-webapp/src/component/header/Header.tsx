import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {Sidebar} from "src/component/sidebar/Sidebar";
import {pages} from "src/router/pages";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
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
      <div className={styles.blockButton}>
        <Button
          onClick={user ? logOut : logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
        />
        <Sidebar
          trigger={
            <Button value={"Navigation"} />
          }
          content={
            <div className={styles.navSidebarContent}>
              <Link
                path={pages.allWays.path}
                value={"All ways"}
              />
              <Link
                path={pages.allUsers.path}
                value={"All users"}
              />
              {user && (
                <>
                  <Link
                    path={pages.way.path(user.uid)}
                    value={"Workflow"}
                  />
                  <Link
                    path={pages.user.path(user.uid)}
                    value={"My ways"}
                  />
                  <Link
                    path={pages.userProfile.path(user.uid)}
                    value={"Profile"}
                  />
                </>
              )}
              <Link
                path={pages.aboutProject.path}
                value={"About"}
              />
            </div>
          }
        />
      </div>
    </div>
  )
  ;
};
