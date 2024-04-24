import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {Select, SelectItemType} from "src/component/select/Select";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";
import {ThemedImage} from "src/component/themedImage/ThemedImage";
import {Toggle} from "src/component/toggle/Toggle";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
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

export const languageOptions: SelectItemType<Language>[] = [
  {id: "1", value: Language.ENGLISH, text: "EN"},
  {id: "2", value: Language.RUSSIAN, text: "RU"},
  {id: "3", value: Language.UKRAINIAN, text: "UA"},
  {id: "4", value: Language.GEORGIAN, text: "KA"},
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

  const sourcesThemeIcons = new Map([
    [Theme.DARK, logo],
    [Theme.LIGHT, logoLight],
  ]);

  const menuItems: (MenuItemLink)[] = [
    {
      path: pages.allWays.getPath({}),
      value: "",
      icon: (
        <Image
          src={logoLight}
          alt={LOGO_TEXT}
          className={styles.logoSidebar}
        />),
    },
    {
      path: pages.home.getPath({}),
      value: LanguageService.sidebar.home[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="HomeIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.allWays.getPath({}),
      value: LanguageService.sidebar.allWays[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="WayIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.allUsers.getPath({}),
      value: LanguageService.sidebar.allUsers[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="UsersIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.aboutProject.getPath({}),
      value: LanguageService.sidebar.about[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="BookIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: props.user
        ? pages.settings.getPath({})
        : pages.page404.getPath({}),
      value: LanguageService.sidebar.settings[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="SettingsIcon"
          className={styles.linkIcon}
        />),
      isHidden: !props.user,
    },

  ];

  return (
    <header
      className={styles.header}
      data-cy={props.dataCy}
    >
      <Link
        className={styles.logo}
        path={pages.allWays.getPath({})}
      >
        <ThemedImage
          className={styles.logoAbout}
          sources={sourcesThemeIcons}
          theme={props.currentTheme}
          name={LOGO_TEXT}
        />
      </Link>
      <div className={styles.headerButtonsContainer}>

        <ThemeSwitcher />

        <Select
          value={props.language}
          name="language"
          options={languageOptions}
          onChange={props.setLanguage}
        />

        <HorizontalContainer className={styles.rightBlock}>
          {props.user ?
            (
              <Link
                path={pages.user.getPath({uuid: props.user.uuid})}
                className={styles.userAvatar}
              >
                <Tooltip
                  key={props.user.name}
                  position={PositionTooltip.BOTTOM_LEFT}
                  content={props.user.name}
                >
                  <Avatar
                    alt={props.user.name}
                    src={props.user.imageUrl}
                    size={AvatarSize.MEDIUM}
                  />
                </Tooltip>
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
              <Icon
                size={IconSize.SMALL}
                name="BurgerMenuIcon"
                className={styles.burgerMenu}
              />
            }
            linkList={menuItems}
            bottomChildren={
              <VerticalContainer className={styles.bottomContainer}>
                <HorizontalContainer className={styles.sidebarItem}>
                  <HorizontalContainer className={styles.iconWithText}>
                    <Icon
                      size={IconSize.MEDIUM}
                      name="GlobeIcon"
                      className={styles.sidebarIcon}
                    />
                    {LanguageService.sidebar.language[props.language]}
                  </HorizontalContainer>
                  <Select
                    value={props.language}
                    name="language"
                    options={languageOptions}
                    onChange={props.setLanguage}
                  />
                </HorizontalContainer>
                <HorizontalContainer className={styles.sidebarItem}>
                  <HorizontalContainer className={styles.iconWithText}>
                    <Icon
                      size={IconSize.MEDIUM}
                      name="MoonIcon"
                      className={styles.sidebarIcon}
                    />
                    {LanguageService.sidebar.nightMode[props.language]}
                  </HorizontalContainer>
                  <Toggle
                    onChange={() => props.setTheme(getNextSwitchTheme(props.currentTheme))}
                    isDefaultChecked={DEFAULT_THEME === props.currentTheme}
                  />
                </HorizontalContainer>
                <VerticalContainer className={styles.socialMedia}>
                  {LanguageService.sidebar.socialMedia[props.language]}
                  <HorizontalContainer className={styles.socialMediaIcons}>
                    <Link
                      className={styles.logo}
                      path="https://linkedin.com/company/masters-way-project"
                    >
                      <Icon
                        size={IconSize.MEDIUM}
                        name="LinkedinIcon"
                        className={styles.socialMediaIcon}
                      />
                    </Link>
                    <Link
                      className={styles.logo}
                      path="https://www.youtube.com/watch?v=DiNNQol15ds&list=PL7eqEW04iXMV2tu_JYAIwerepUTZJjciM&index=2"
                    >
                      <Icon
                        size={IconSize.MEDIUM}
                        name="YoutubeIcon"
                        className={styles.socialMediaIcon}
                      />
                    </Link>
                  </HorizontalContainer>
                </VerticalContainer>
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
