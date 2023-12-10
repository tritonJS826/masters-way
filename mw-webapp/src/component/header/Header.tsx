import {Button} from "src/component/button/Button";
import {Link} from "src/component/link/Link";
import {Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {useGlobalContext} from "src/GlobalContext";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LOGO_TEXT = "master's way";

/**
 * Navigation link props.
 */
interface NavigationLink {

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
const renderNavigationLinks = (navigationLinks: (NavigationLink)[]) => {
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
  const {user} = useGlobalContext();

  const navigationLinks: (NavigationLink | null)[] = [
    {
      path: pages.allWays.getPath({}),
      value: "All ways",
    },
    {
      path: pages.allUsers.getPath({}),
      value: "All users",
    },
    user && {
      path: pages.user.getPath({uuid: user.uuid}),
      value: "My ways",
    },
    {
      path: pages.aboutProject.getPath({}),
      value: "About",
    },
  ];

  const navigationLinksWithoutNull: NavigationLink[] = navigationLinks.flatMap((link) => link ? [link] : []);

  return (
    <div className={styles.header}>
      <Title
        level={HeadingLevel.h1}
        text={LOGO_TEXT.toUpperCase()}
      />
      {user &&
        <Title
          level={HeadingLevel.h2}
          text={`Hello, ${user.name}!`}
        />
      }
      <div className={styles.headerButtonsContainer}>
        <Button
          onClick={user ? AuthService.logOut : AuthService.logIn}
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
              {renderNavigationLinks(navigationLinksWithoutNull)}
            </div>
          }
        />
      </div>
    </div>
  );
};
