import google from "src/assets/google.svg";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Avatar, AvatarSize} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Image} from "src/component/image/Image";
import {Link} from "src/component/link/Link";
import {Modal} from "src/component/modal/Modal";
import {Select, SelectItemType} from "src/component/select/Select";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {getNextSwitchTheme, ThemeSwitcher} from "src/component/themeSwitcher/ThemeSwitcher";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Toggle} from "src/component/toggle/Toggle";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {DEFAULT_THEME, Theme} from "src/globalStore/ThemeStore";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import {LanguageService} from "src/service/LanguageService";
import {env} from "src/utils/env/env";
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
  theme: Theme;

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
      path: pages.home.getPath({}),
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
      isHidden: !props.user,
      path: pages.user.getPath({uuid: props.user?.uuid ?? ""}),
      value: LanguageService.sidebar.myWays[props.language],
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="UserIcon"
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
        path={pages.home.getPath({})}
      >
        <ThemedImage
          className={styles.logo}
          sources={getMapThemeSources({
            [Theme.DARK]: logoLight,
            [Theme.LIGHT]: logo,
          })}
          theme={props.theme}
          name={LOGO_TEXT}
        />
      </Link>
      <div className={styles.headerButtonsContainer}>

        <ThemeSwitcher
          language={props.language}
          theme={props.theme}
          setTheme={props.setTheme}
          className={styles.themeSwitcher}
        />

        <Select
          value={props.language}
          name="language"
          options={languageOptions}
          onChange={props.setLanguage}
          className={styles.selectLanguage}
        />

        <HorizontalContainer className={styles.rightBlock}>
          {props.user ?
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
            </Link>
            :
            <Modal
              trigger={
                <Button
                  onClick={() => {}}
                  value={LanguageService.header.loginButton[props.language]}
                  buttonType={ButtonType.PRIMARY}
                />
              }
              className={styles.loginModal}
              content={
                <HorizontalContainer className={styles.loginContainer}>
                  <Image
                    alt="Login image"
                    src="https://lh3.google.com/u/0/d/1AF0qlh-KmFAtFILD9wCPw91OrZVZs8sH=w1361-h606-iv1"
                    className={styles.loginImage}
                  />
                  <VerticalContainer className={styles.loginContent}>
                    <Title
                      level={HeadingLevel.h2}
                      text={LanguageService.home.welcome[props.language]}
                      className={styles.loginTitle}
                      placeholder=""
                    />
                    <VerticalContainer className={styles.loginButtons}>
                      <Button
                        onClick={AuthService.logIn}
                        className={styles.loginGoogleButton}
                        value={
                          <HorizontalContainer className={styles.googleButtonValue}>
                            <Image
                              src={google}
                              alt="Google icon"
                              className={styles.googleIcon}
                            />
                            {LanguageService.modals.loginModal.signInWithGoogle[props.language]}
                          </HorizontalContainer>
                        }
                      />
                      {/* Experiment with OAuth with google */}
                      <div style={{opacity: 0}}>
                        <Link path={`${env.API_BASE_PATH}/auth/google`}>
                          google OAuth
                        </Link>
                      </div>
                    </VerticalContainer>
                  </VerticalContainer>
                </HorizontalContainer>
              }
            />

          }
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
                    onChange={() => props.setTheme(getNextSwitchTheme(props.theme))}
                    isDefaultChecked={DEFAULT_THEME === props.theme}
                  />
                </HorizontalContainer>
                <VerticalContainer className={styles.socialMedia}>
                  {LanguageService.sidebar.socialMedia[props.language]}
                  <HorizontalContainer className={styles.socialMediaIcons}>
                    <Link
                      className={styles.logo}
                      path="https://linkedin.com/company/masters-way-project"
                      newTab
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
                      newTab
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
