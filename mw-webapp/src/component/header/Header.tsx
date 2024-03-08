import logo from "src/assets/mastersWayLogo.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {OptionType} from "src/component/select/option/Option";
import {Select} from "src/component/select/Select";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {useGlobalContext} from "src/GlobalContext";
import {ThemeSwitcher} from "src/logic/themeSwitcher/ThemeSwitcher";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";
import styles from "src/component/header/Header.module.scss";

const LOGO_TEXT = "Master's way";

export const languageOptions: OptionType<Language>[] = [
  {id: "1", value: Language.ENGLISH, text: "en"},
  {id: "2", value: Language.RUSSIAN, text: "ru"},
];

/**
 * Header component
 */
export const Header = () => {
  const {user, language, setLanguage} = useGlobalContext();

  const menuItems: (NavigationLink)[] = [
    {
      path: pages.allWays.getPath({}),
      value: LanguageService.sidebar.allWays[language],
    },
    {
      path: pages.allUsers.getPath({}),
      value: LanguageService.sidebar.allUsers[language],
    },
    {
      path: user
        ? pages.user.getPath({uuid: user.uuid})
        : pages.page404.getPath({}),
      value: LanguageService.sidebar.myWays[language],
      isHidden: !user,
    },
    {
      path: user
        ? pages.settings.getPath({})
        : pages.page404.getPath({}),
      value: LanguageService.sidebar.settings[language],
      isHidden: !user,
    },
    {
      path: pages.aboutProject.getPath({}),
      value: LanguageService.sidebar.about[language],
    },
  ];

  return (
    <div className={styles.header}>
      <Link path={pages.allWays.getPath({})}>
        <Image
          src={logo}
          alt={LOGO_TEXT}
        />
      </Link>
      <div className={styles.headerButtonsContainer}>
        <ThemeSwitcher />

        <Select
          value={language}
          name="language"
          options={languageOptions}
          onChange={setLanguage}
        />

        {user &&
        <Link path={pages.user.getPath({uuid: user.uuid})}>
          <Title
            level={HeadingLevel.h4}
            text={user.name}
            className={styles.userName}
          />
        </Link>
        }

        <Button
          onClick={user ? AuthService.logOut : AuthService.logIn}
          value={user
            ? LanguageService.header.logoutButton[language]
            : LanguageService.header.loginButton[language]}
          buttonType={ButtonType.TERTIARY}
        />
        <Sidebar
          trigger={
            <Button
              value={LanguageService.header.menu[language]}
              onClick={() => { }}
              buttonType={ButtonType.TERTIARY}
            />
          }
          linkList={menuItems}
        />
      </div>
    </div>
  );
};
