import {observer} from "mobx-react-lite";
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
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {getNextSwitchTheme, ThemeSwitcher} from "src/component/themeSwitcher/ThemeSwitcher";
import {Toggle} from "src/component/toggle/Toggle";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language, languageStore} from "src/globalStore/LanguageStore";
import {DEFAULT_THEME, Theme, themeStore} from "src/globalStore/ThemeStore";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import {LanguageService} from "src/service/LanguageService";
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

}

/**
 * Header component
 */
export const Header = observer((props: HeaderProps) => {
  const {theme, setTheme} = themeStore;
  const {language, setLanguage} = languageStore;

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
      value: LanguageService.sidebar.home[language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="HomeIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.allWays.getPath({}),
      value: LanguageService.sidebar.allWays[language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="WayIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.allUsers.getPath({}),
      value: LanguageService.sidebar.allUsers[language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="UsersIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.aboutProject.getPath({}),
      value: LanguageService.sidebar.about[language],
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
      value: LanguageService.sidebar.settings[language],
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
          className={styles.logo}
          sources={getMapThemeSources({
            [Theme.DARK]: logoLight,
            [Theme.LIGHT]: logo,
          })}
          theme={theme}
          name={LOGO_TEXT}
        />
      </Link>
      <div className={styles.headerButtonsContainer}>

        <ThemeSwitcher
          language={language}
          theme={theme}
          setTheme={setTheme}
          className={styles.themeSwitcher}
        />

        <Select
          value={language}
          name="language"
          options={languageOptions}
          onChange={setLanguage}
          className={styles.selectLanguage}
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
                value={LanguageService.header.loginButton[language]}
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
                    {LanguageService.sidebar.language[language]}
                  </HorizontalContainer>
                  <Select
                    value={language}
                    name="language"
                    options={languageOptions}
                    onChange={setLanguage}
                  />
                </HorizontalContainer>
                <HorizontalContainer className={styles.sidebarItem}>
                  <HorizontalContainer className={styles.iconWithText}>
                    <Icon
                      size={IconSize.MEDIUM}
                      name="MoonIcon"
                      className={styles.sidebarIcon}
                    />
                    {LanguageService.sidebar.nightMode[language]}
                  </HorizontalContainer>
                  <Toggle
                    onChange={() => setTheme(getNextSwitchTheme(theme))}
                    isDefaultChecked={DEFAULT_THEME === theme}
                  />
                </HorizontalContainer>
                <VerticalContainer className={styles.socialMedia}>
                  {LanguageService.sidebar.socialMedia[language]}
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
                  value={LanguageService.header.logoutButton[language]}
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
});
