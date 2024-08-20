import {TrackHeader} from "src/analytics/headerAnalytics";
import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {Button, ButtonType} from "src/component/button/Button";
import {languageOptions, LOGO_TEXT} from "src/component/header/Header";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Link} from "src/component/link/Link";
import {Select} from "src/component/select/Select";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {ThemeSwitcher} from "src/component/themeSwitcher/ThemeSwitcher";
import {Language} from "src/globalStore/LanguageStore";
import {Theme} from "src/globalStore/ThemeStore";
import {pages} from "src/router/pages";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/landingPages/headerLanding/HeaderLanding.module.scss";

/**
 *Header landing props
 */
interface HeaderLandingProps {

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
 * Header landing
 */
export const HeaderLanding = (props: HeaderLandingProps) => {

  return (
    <header className={styles.header}>
      <Link
        className={styles.logo}
        path={pages.home.getPath({})}
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
      <HorizontalContainer className={styles.navBlock}>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
        <div>
          Block
        </div>
      </HorizontalContainer>

      <HorizontalContainer className={styles.headerThemeBlock}>
        <ThemeSwitcher
          language={props.language}
          theme={props.theme}
          onClick={(theme: Theme) => {
            TrackHeader.trackThemeClick();
            props.setTheme(theme);
          }}
          className={styles.themeSwitcher}
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
        />

        <Button
          buttonType={ButtonType.PRIMARY}
          value={LanguageService.header.logoutButton[props.language]}
          onClick={() => {}}
        />
      </HorizontalContainer>
    </header>
  );
};
