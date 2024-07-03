import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {navigationMenuIds} from "cypress/accessIds/navigationMenuAccessIds";
import {TrackHeader} from "src/analytics/headerAnalytics";
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
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {Language} from "src/globalStore/LanguageStore";
import {DEFAULT_THEME, Theme} from "src/globalStore/ThemeStore";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/header/Header.module.scss";

export const LOGO_TEXT = "Master's way";

export const languageOptions: SelectItemType<Language>[] = [
  {id: "1", value: Language.ENGLISH, text: "EN", dataCy: navigationMenuIds.language.enItem},
  {id: "2", value: Language.RUSSIAN, text: "RU", dataCy: navigationMenuIds.language.ruItem},
  {id: "3", value: Language.UKRAINIAN, text: "UA", dataCy: navigationMenuIds.language.uaItem},
  {id: "4", value: Language.GEORGIAN, text: "KA", dataCy: navigationMenuIds.language.kaItem},
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
   * Clear user
   */
  clearUser: () => void;

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
      dataCy: navigationMenuIds.menuItemLinks.logo,
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
      dataCy: navigationMenuIds.menuItemLinks.home,
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
      dataCy: navigationMenuIds.menuItemLinks.personalArea,
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
      dataCy: navigationMenuIds.menuItemLinks.allWays,
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
      dataCy: navigationMenuIds.menuItemLinks.allUsers,
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
      dataCy: navigationMenuIds.menuItemLinks.aboutProject,
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
      dataCy: navigationMenuIds.menuItemLinks.settings,
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="SettingsIcon"
          className={styles.linkIcon}
        />),
      isHidden: !props.user,
    },

  ];

  /**
   * Logout
   */
  const logout = () => {
    AuthDAL.logOut();
    props.clearUser();
  };

  return (
    <header
      className={styles.header}
      data-cy={props.dataCy}
    >
      <Link
        className={styles.logo}
        path={pages.home.getPath({})}
        dataCy={headerAccessIds.logo}
        onClick={TrackHeader.trackLogoClick}
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
      <HorizontalContainer className={styles.headerButtonsContainer}>
        <HorizontalContainer className={styles.headerThemeLanguageBlock}>
          <ThemeSwitcher
            language={props.language}
            theme={props.theme}
            onClick={(theme: Theme) => {
              TrackHeader.trackThemeClick();
              props.setTheme(theme);
            }}
            className={styles.themeSwitcher}
            dataCy={headerAccessIds.settings.themeSwitcher}
          />

          <Select
            value={props.language}
            name="language"
            ariaLabel="Dropdown language selector"
            options={languageOptions}
            onChange={(lang: Language) => {
              TrackHeader.trackSelectLanguageClick();
              props.setLanguage(lang);
            }}
            className={styles.selectLanguage}
            cy={{dataCyTrigger: headerAccessIds.settings.language.select, dataCyContentList: "", dataCyValue: ""}}
          />
        </HorizontalContainer>
        <HorizontalContainer className={styles.headerSidebarBlock}>
          {props.user ?
            <Link
              path={pages.user.getPath({uuid: props.user.uuid})}
              className={styles.userAvatar}
            >
              <Tooltip
                key={props.user.name}
                position={PositionTooltip.BOTTOM}
                content={props.user.name}
              >
                <Avatar
                  alt={props.user.name}
                  src={props.user.imageUrl}
                  size={AvatarSize.MEDIUM}
                  dataCy={headerAccessIds.avatar}
                />
              </Tooltip>
            </Link>
            :
            <Modal
              trigger={
                <Button
                  onClick={TrackHeader.trackLoginClick}
                  value={LanguageService.header.loginButton[props.language]}
                  buttonType={ButtonType.PRIMARY}
                  dataCy={headerAccessIds.loginButton}
                />
              }
              className={styles.loginModal}
              content={
                <HorizontalContainer className={styles.loginContainer}>
                  <Image
                    alt="Login image"
                    src="https://drive.google.com/thumbnail?id=1AF0qlh-KmFAtFILD9wCPw91OrZVZs8sH&sz=w1000"
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
                        onClick={() => {
                          TrackHeader.trackLoginWithGoogleClick();
                          AuthDAL.authGoogle();
                        }}
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
                    </VerticalContainer>
                  </VerticalContainer>
                </HorizontalContainer>
              }
            />

          }
          <Sidebar
            onOpenStatusChanged={TrackHeader.trackBurgerStateChanged}
            trigger={
              <Icon
                size={IconSize.SMALL}
                name="BurgerMenuIcon"
                className={styles.burgerMenu}
                dataCy={headerAccessIds.burgerMenu}
              />
            }
            cy={{
              dataCyContent: {
                dataCyClose: navigationMenuIds.closeButton,
                dataCyContent: navigationMenuIds.navigationMenu,
              },
            }}
            linkList={menuItems}
            bottomChildren={
              <VerticalContainer className={styles.bottomContainer}>
                <HorizontalContainer className={styles.sidebarItem}>
                  <HorizontalContainer
                    className={styles.iconWithText}
                    dataCy={navigationMenuIds.language.text}
                  >
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
                    cy={{dataCyTrigger: navigationMenuIds.language.select, dataCyContentList: "", dataCyValue: ""}}
                  />
                </HorizontalContainer>
                <HorizontalContainer className={styles.sidebarItem}>
                  <HorizontalContainer
                    className={styles.iconWithText}
                    dataCy={navigationMenuIds.nightMode.text}
                  >
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
                    dataCy={navigationMenuIds.nightMode.slider}
                  />
                </HorizontalContainer>
                <VerticalContainer
                  className={styles.socialMedia}
                  dataCy={navigationMenuIds.socialMedia.text}
                >
                  <Title
                    level={HeadingLevel.h4}
                    text={LanguageService.home.socialMedia[props.language]}
                    placeholder=""
                    classNameHeading={styles.socialMediaText}
                  />
                  <HorizontalContainer className={styles.socialMediaIcons}>
                    <Link
                      path="https://linkedin.com/company/masters-way-project"
                      isNewTab
                      dataCy={navigationMenuIds.socialMedia.linkedinLink}
                      ariaLabel="Master's Way LinkedIn page"
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="LinkedinIcon"
                          className={styles.socialMediaIcon}
                        />
                      </div>
                    </Link>
                    <Link
                      path="https://www.youtube.com/watch?v=8QGIjw6oyDA&list=PLif3tyf4TWIlhAV-7AoEpd9fGolkooIxm&index=2"
                      isNewTab
                      dataCy={navigationMenuIds.socialMedia.youtubeLink}
                      ariaLabel="Master's Way Youtube page"
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="YoutubeIcon"
                          className={styles.socialMediaIcon}
                        />
                      </div>
                    </Link>
                    <Link
                      path="https://github.com/tritonJS826/masters-way"
                      isNewTab
                      ariaLabel="Master's Way Github page"
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="GithubIcon"
                          className={styles.socialMediaIcon}
                        />
                      </div>
                    </Link>
                  </HorizontalContainer>
                </VerticalContainer>
                {props.user &&
                <Button
                  onClick={logout}
                  value={LanguageService.header.logoutButton[props.language]}
                  buttonType={ButtonType.PRIMARY}
                  dataCy={navigationMenuIds.logoutButton}
                />
                }
              </VerticalContainer>
            }
          />

        </HorizontalContainer>
      </HorizontalContainer>
    </header>
  );
};
