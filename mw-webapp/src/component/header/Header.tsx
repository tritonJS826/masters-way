import {useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {useGlobalContext} from "src/GlobalContext";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LOGO_TEXT = "master's way";

/**
 * Header component
 */
export const Header = () => {
  const {user} = useGlobalContext();
  const navigate = useNavigate();

  const menuLinks: (NavigationLink)[] = [
    {
      path: pages.allWays.getPath({}),
      value: "All ways",
    },
    {
      path: pages.allUsers.getPath({}),
      value: "All users",
    },
    {
      path: user
        ? pages.user.getPath({uuid: user.uuid})
        : pages.page404.getPath({}),
      value: "My ways",
      isHidden: !user,
    },
    {
      path: pages.aboutProject.getPath({}),
      value: "About the project",
    },
  ];

  return (
    <div className={styles.header}>
      <Title
        level={HeadingLevel.h1}
        text={LOGO_TEXT.toUpperCase()}
        onClick={() => navigate(pages.allWays.getPath({}))}
        className={styles.logo}
      />
      <div className={styles.headerButtonsContainer}>
        {user &&
        <Title
          level={HeadingLevel.h4}
          text={user.name}
          className={styles.userName}
          onClick={() => navigate(pages.user.getPath({uuid: user.uuid}))}
        />
        }
        <Button
          onClick={user ? AuthService.logOut : AuthService.logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
        />
        <Sidebar
          trigger={
            <Button
              value="Navigation"
              onClick={() => {}}
            />
          }
          linkList={menuLinks}
        />
      </div>
    </div>
  );
};
