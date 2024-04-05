import logo from "src/assets/mastersWayLogo.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {OptionType} from "src/component/select/option/Option";
import {Select} from "src/component/select/Select";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Toggle} from "src/component/toggle/Toggle";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getNextSwitchTheme, ThemeSwitcher} from "src/logic/themeSwitcher/ThemeSwitcher";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import {LanguageService} from "src/service/LangauageService";
import {Language} from "src/utils/LanguageWorker";
import {DEFAULT_THEME, Theme} from "src/utils/ThemeWorker";
import styles from "src/component/header/Header.module.scss";

export const LOGO_TEXT = "Master's way";

export const languageOptions: OptionType<Language>[] = [
  {id: "1", value: Language.ENGLISH, text: "en"},
  {id: "2", value: Language.RUSSIAN, text: "ru"},
  {id: "3", value: Language.UKRAINIAN, text: "ua"},
  {id: "4", value: Language.GEORGIAN, text: "ka"},
];

/**
 * Checkbox props
 */
interface HeaderProps {

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Current user
   */
  user: User | null;

  /**
   * Current language
   */
  language: Language;

  /**
   * Callback to set language
   */
  setLanguage: (language: Language) => void;

  /**
   * Current theme
   */
  currentTheme: Theme;

  /**
   * Callback to set theme
   */
  setTheme: (theme: Theme) => void;
}

/**
 * Header component
 */
export const Header = (props: HeaderProps) => {

  const menuItems: (MenuItemLink)[] = [
    {
      path: pages.allWays.getPath({}),
      value: LanguageService.sidebar.allWays[props.language],
    },
    {
      path: pages.allUsers.getPath({}),
      value: LanguageService.sidebar.allUsers[props.language],
    },
    {
      path: props.user
        ? pages.user.getPath({uuid: props.user.uuid})
        : pages.page404.getPath({}),
      value: LanguageService.sidebar.myWays[props.language],
      isHidden: !props.user,
    },
    {
      path: props.user
        ? pages.settings.getPath({})
        : pages.page404.getPath({}),
      value: LanguageService.sidebar.settings[props.language],
      isHidden: !props.user,
    },
    {
      path: pages.aboutProject.getPath({}),
      value: LanguageService.sidebar.about[props.language],
    },
  ];

  return (
    <header
      className={styles.header}
      data-cy={props.dataCy}
    >
      <Link path={pages.allWays.getPath({})}>
        <Image
          src={logo}
          alt={LOGO_TEXT}
        />
      </Link>
      <div className={styles.headerButtonsContainer}>

        <HorizontalContainer>
          <ThemeSwitcher />

          <Select
            value={props.language}
            name="language"
            options={languageOptions}
            onChange={props.setLanguage}
          />

        </HorizontalContainer>

        <HorizontalContainer className={styles.rightBlock}>
          {props.user ?
            (<Link path={pages.user.getPath({uuid: props.user.uuid})}>
              <Title
                level={HeadingLevel.h4}
                text={props.user.name}
                className={styles.userName}
              />
            </Link>)
            : (
              <Button
                onClick={AuthService.logIn}
                value={LanguageService.header.loginButton[props.language]}
                buttonType={ButtonType.PRIMARY}
              />
            )}
          <Sidebar
            trigger={
              <Button
                value={LanguageService.header.menu[props.language]}
                onClick={() => { }}
                buttonType={ButtonType.TERTIARY}
              />
            }
            linkList={menuItems}
            bottomChildren={
              <VerticalContainer className={styles.bottomContainer}>
                <HorizontalContainer className={styles.sidebarItem}>
                  <Icon
                    size={IconSize.MEDIUM}
                    name="MoonIcon"
                  />
                  Night mode
                  <Toggle
                    onChange={() => props.setTheme(getNextSwitchTheme(props.currentTheme))}
                    isDefaultChecked={DEFAULT_THEME === props.currentTheme}
                  />
                </HorizontalContainer>
                {props.user &&
                <Button
                  onClick={AuthService.logOut}
                  value={LanguageService.header.logoutButton[props.language]}
                  buttonType={ButtonType.SECONDARY}
                />
                }
              </VerticalContainer>
            }
          />

        </HorizontalContainer>
      </div>
    </header>
  );
};
