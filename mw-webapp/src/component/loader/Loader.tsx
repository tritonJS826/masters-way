import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {LOGO_TEXT} from "src/component/header/Header";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {Theme} from "src/globalStore/ThemeStore";
import styles from "src/component/loader/Loader.module.scss";

/**
 * Props for the Image component
 */
interface LoaderProps {

  /**
   * Current theme value
   */
  theme: Theme;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * Loader component
 * Used for page loading
 */
export const Loader = (props: LoaderProps) => {
  return (
    <div
      className={styles.loaderWrapper}
      data-cy={props.dataCy}
    >
      <ThemedImage
        className={styles.loader}
        sources={getMapThemeSources({
          [Theme.DARK]: logoLight,
          [Theme.LIGHT]: logo,
        })}
        theme={props.theme}
        name={LOGO_TEXT}
      />
    </div>
  );
};
