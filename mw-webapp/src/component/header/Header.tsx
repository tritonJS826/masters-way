import logo from "src/assets/mastersWayLogo.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {useGlobalContext} from "src/GlobalContext";
import {ThemeSwitcher} from "src/logic/themeSwitcher/ThemeSwitcher";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LOGO_TEXT = "Master's way";

/**
 * Header component
 */
export const Header = () => {
  const {user} = useGlobalContext();

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
      <Link path={pages.allWays.getPath({})}>
      <Tooltip
          content={LOGO_TEXT}
          position={PositionTooltip.BOTTOM}
        >
        <Image
          src={logo}
          alt={LOGO_TEXT}
        />
        </Tooltip>
      </Link>
      <div className={styles.headerButtonsContainer}>
        <ThemeSwitcher />

        {user &&
        <Link path={pages.user.getPath({uuid: user.uuid})}>
          <Tooltip
              content={user.name}
              position={PositionTooltip.BOTTOM}
            >
          <Title
            level={HeadingLevel.h4}
            text={user.name}
            className={styles.userName}
          />
          </Tooltip>
        </Link>
        }

<Tooltip
            content={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
            position={PositionTooltip.BOTTOM}
          >
        <Button
          onClick={user ? AuthService.logOut : AuthService.logIn}
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
          buttonType={ButtonType.TERTIARY}
        />
        </Tooltip>
        
        <Tooltip
            content={"Menu"}
            position={PositionTooltip.BOTTOM}
          >
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
        </Tooltip>
      </div>
    </div>
  );
};