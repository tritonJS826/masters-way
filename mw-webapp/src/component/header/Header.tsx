import {useNavigate} from "react-router-dom";
import logo from "src/assets/mastersWayLogo.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {Image} from "src/component/image/Image";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {useGlobalContext} from "src/GlobalContext";
import {ThemeSwitcher} from "src/logic/themeSwitcher/ThemeSwitcher";
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

  const menuItems: (NavigationLink)[] = [
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
      path: user
        ? pages.settings.getPath({})
        : pages.page404.getPath({}),
      value: "Settings",
      isHidden: !user,
    },
    {
      path: pages.aboutProject.getPath({}),
      value: "About the project",
    },
  ];

  return (
    <div className={styles.header}>
      <a
        className={styles.logo}
        onClick={() => navigate(pages.allWays.getPath({}))}
      >
        <Image
          src={logo}
          alt={LOGO_TEXT}
        />
      </a>
      <div className={styles.headerButtonsContainer}>
        <ThemeSwitcher />
        {user &&
        <a onClick={() => navigate(pages.user.getPath({uuid: user.uuid}))}>
          <Title
            level={HeadingLevel.h4}
            text={user.name}
            className={styles.userName}
          />
        </a>
        }

        <div className={styles.buttons}>
          <Button
            onClick={user ? AuthService.logOut : AuthService.logIn}
            value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
            buttonType={ButtonType.TERTIARY}
          />
          <Sidebar
            trigger={
              <Button
                value="Menu"
                onClick={() => { }}
                buttonType={ButtonType.TERTIARY}
              />
            }
            linkList={menuItems}
          />
        </div>
      </div>
    </div>
  );
};
