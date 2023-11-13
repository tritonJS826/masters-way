import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {pages} from "src/router/pages";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LOGO_TEXT = "master's way";

/**
 * Navigation link props.
 */
interface navigationLink {

  /**
   * Navigation link path.
   */
  path: string;

  /**
   * Navigation link value.
   */
  value: string;
}

/**
 * Renders navigation links based on the provided navigationLinks array.
 */
const renderNavigationLinks = (navigationLinks: (navigationLink | null)[]) => {
  return navigationLinks.map((item) => (
    item && (
      <Link
        key={item.value}
        path={item.path}
        value={item.value}
      />
    )
  ));
};

/**
 * Header component
 */
export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  const navigationLinks: (navigationLink | null)[] = [
    {
      path: pages.allWays.path,
      value: "All ways",
    },
    {
      path: pages.allUsers.path,
      value: "All users",
    },
    user && {
      path: pages.user.path(user.uid),
      value: "My ways",
    },
    user && {
      path: pages.userProfile.path(user.uid),
      value: "Profile",
    },
    {
      path: pages.aboutProject.path,
      value: "About",
    },
  ];

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <div className={styles.header}>
      <Title
        level={HeadingLevel.h1}
        text={LOGO_TEXT.toUpperCase()}
      />
      {user &&
        <Title
          level={HeadingLevel.h2}
          text={`Hello, ${user.displayName}!`}
        />
      }
      <div className={styles.headerBtnContainer}>
        <Button
          onClick={user ? logOut : logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
        />
        <Sidebar
          trigger={
            <Button
              value={"Navigation"}
              onClick={() => {}}
            />
          }
          content={
            <div className={styles.navSidebarContent}>
              {renderNavigationLinks(navigationLinks)}
            </div>
          }
        />
      </div>
    </div>
  );
};
