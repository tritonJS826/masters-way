import {useNavigate} from "react-router-dom";
import clsx from "clsx";
import {headerAccessIds} from "cypress/accessIds/headerAccessIds";
import {navigationMenuIds} from "cypress/accessIds/navigationMenuAccessIds";
import {observer} from "mobx-react-lite";
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
import {ThemeSwitcher} from "src/component/themeSwitcher/ThemeSwitcher";
import {HeadingLevel, Title} from "src/component/title/Title";
import {Toggle} from "src/component/toggle/Toggle";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {Language} from "src/globalStore/LanguageStore";
import {DEFAULT_THEME, Theme} from "src/globalStore/ThemeStore";
import {CurrentUser} from "src/model/businessModel/CurrentUser";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/header/Header.module.scss";

export const LOGO_TEXT = "Master's way";

export const languageOptions: SelectItemType<Language>[] = [
  {id: "1", value: Language.ENGLISH, text: "EN", dataCy: navigationMenuIds.language.enItem},
  {id: "2", value: Language.RUSSIAN, text: "RU", dataCy: navigationMenuIds.language.ruItem},
  {id: "3", value: Language.UKRAINIAN, text: "UA", dataCy: navigationMenuIds.language.uaItem},
];

/**
 * Header props
 */
interface HeaderProps {

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Current user
   */
  user: CurrentUser | null;

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

  /**
   * If true notification block is open
   */
  isNotificationBlockOpen: boolean;

  /**
   * Callback to open notifications
   */
  openNotificationBlock: (isNotificationBlockOpen: boolean) => void;

  /**
   * Unread notifications amount
   */
  unreadNotificationsAmount: number | null;

  /**
   * Check websocket connection
   */
  isConnectionEstablished: boolean;

}

/**
 * Header component
 */
export const Header = observer((props: HeaderProps) => {
  const navigate = useNavigate();
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
      path: pages.allTrainings.getPath({}),
      value: LanguageService.sidebar.allTrainings[props.language],
      dataCy: navigationMenuIds.menuItemLinks.allTrainings,
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="TargetIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.allTests.getPath({}),
      value: LanguageService.sidebar.allTests[props.language],
      dataCy: navigationMenuIds.menuItemLinks.allTests,
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="TestIcon"
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
      path: pages.partnership.getPath({}),
      value: LanguageService.sidebar.partnership[props.language],
      dataCy: navigationMenuIds.menuItemLinks.partnership,
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="UserCheckIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: pages.pricing.getPath({}),
      value: LanguageService.sidebar.pricing[props.language],
      dataCy: navigationMenuIds.menuItemLinks.pricing,
      icon: (
        <Icon
          size={IconSize.MEDIUM}
          name="AwardIcon"
          className={styles.linkIcon}
        />),
    },
    {
      path: props.user
        ? pages.settings.getPath({})
        : pages.errorPage.getPath({}),
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
      <HorizontalContainer className={styles.logoWithBell}>
        <Link
          className={styles.logoLink}
          path={pages.home.getPath({})}
          dataCy={headerAccessIds.logo}
          onClick={TrackHeader.trackLogoClick}
        >
          <ThemedImage
            className={styles.logo}
            sources={getMapThemeSources({
              [Theme.DARK]: logoLight,
              [Theme.LIGHT]: logo,
              [Theme.OBSIDIAN]: logoLight,
              [Theme.NEW]: logo,
            })}
            theme={props.theme}
            name={LOGO_TEXT}
          />
        </Link>
        {props.user &&
          <HorizontalContainer className={styles.bellWithUnreadNotificationsAmount}>
            <Button
              onClick={() => props.isNotificationBlockOpen
                ? props.openNotificationBlock(false)
                : props.openNotificationBlock(true)
              }
              buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
              className={clsx(styles.notificationTrigger, props.isNotificationBlockOpen && styles.active)}
              icon={
                <Icon
                  name="BellIcon"
                  size={IconSize.MEDIUM}
                />
              }
            />
            <div className={clsx(
              styles.indicator,
              props.isConnectionEstablished
                ? styles.onlineIndicator
                : styles.offlineIndicator)}
            />
            {!!props.unreadNotificationsAmount &&
            <HorizontalContainer className={styles.unreadNotificationAmount}>
              {props.unreadNotificationsAmount}
            </HorizontalContainer>
            }
          </HorizontalContainer>
        }
      </HorizontalContainer>
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
            ariaLabel={LanguageService.header.languageSelectAriaLabel[props.language]}
            options={languageOptions}
            onChange={(lang: Language) => {
              TrackHeader.trackSelectLanguageClick();
              props.setLanguage(lang);
            }}
            className={styles.selectLanguage}
            cy={{dataCyTrigger: headerAccessIds.settings.language.select, dataCyContentList: "", dataCyValue: ""}}
          />
          {props.user &&
          <Tooltip
            position={PositionTooltip.BOTTOM}
            content={LanguageService.header.coinsButtonTooltip[props.language]}
          >
            <HorizontalContainer className={styles.coinsContainer}>
              <Button
                onClick={() => navigate(pages.settings.getPath({}))}
                buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                className={styles.coinsButton}
                value={<>
                  <Icon
                    name="HexagonIcon"
                    size={IconSize.BIG}
                  />
                </>}
              />
              <HorizontalContainer className={styles.coinsAmount}>
                {props.user.profileSetting.coins}
              </HorizontalContainer>
            </HorizontalContainer>
          </Tooltip>
          }
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
              contentClassName={styles.loginModal}
              content={
                <HorizontalContainer className={styles.loginContainer}>
                  <Image
                    alt="Login image"
                    src="https://drive.google.com/thumbnail?id=1QzcyNH0fOgdHjMtx35ZUJl89PPB4Ly0O&sz=w1000"
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
            ariaLabel={LanguageService.sidebar.navMenuAriaLabel[props.language]}
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
                    onChange={() => props.setTheme(DEFAULT_THEME === props.theme ? Theme.DARK : DEFAULT_THEME)}
                    isDefaultChecked={props.theme === Theme.DARK}
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
                      ariaLabel={LanguageService.common.socialMediaAriaLabel.linkedIn[props.language]}
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
                      ariaLabel={LanguageService.common.socialMediaAriaLabel.youtube[props.language]}
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
                      path="https://www.patreon.com/c/mastersway/posts"
                      isNewTab
                      ariaLabel={LanguageService.common.socialMediaAriaLabel.patreon[props.language]}
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="PatreonIcon"
                          className={clsx(styles.socialMediaIcon, styles.patreonIcon)}
                        />
                      </div>
                    </Link>
                    <Link
                      path="https://t.me/tsSandbox"
                      isNewTab
                      ariaLabel={LanguageService.common.socialMediaAriaLabel.telegram[props.language]}
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="TelegramIcon"
                          className={clsx(styles.socialMediaIcon, styles.telegramIcon)}
                        />
                      </div>
                    </Link>
                    <Link
                      path="https://discord.gg/JEUJGJ3A"
                      isNewTab
                      ariaLabel={LanguageService.common.socialMediaAriaLabel.discord[props.language]}
                    >
                      <div className={styles.iconWrapper}>
                        <Icon
                          size={IconSize.SMALL}
                          name="DiscordIcon"
                          className={clsx(styles.socialMediaIcon, styles.discordIcon)}
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
});
