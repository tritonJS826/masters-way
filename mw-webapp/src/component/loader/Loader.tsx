import logo from "src/assets/mastersWayLogo.svg";
import logoLight from "src/assets/mastersWayLogoLight.svg";
import {LOGO_TEXT} from "src/component/header/Header";
import {getMapThemeSources, ThemedImage} from "src/component/themedImage/ThemedImage";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
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

  /**
   * Is positioning absolute. False @default
   */
  isAbsolute?: boolean;
}

/**
 * Loader component
 * Used for page loading
 */
export const Loader = (props: LoaderProps) => {
  return props.isAbsolute
    ? (
      <div
        className={styles.loaderWrapper}
        data-cy={props.dataCy}
      >
        <ThemedImage
          className={styles.loader}
          sources={getMapThemeSources({
            [Theme.DARK]: logoLight,
            [Theme.LIGHT]: logo,
            [Theme.OBSIDIAN]: logoLight,
            [Theme.NEW]: logo,
          })}
          theme={props.theme}
          name={LOGO_TEXT}
        />
        <span className={styles.loaderLine} />
      </div>
    )
    : (
      <VerticalContainer className={styles.loaderBlockWrapper}>
        <ThemedImage
          className={styles.loader}
          sources={getMapThemeSources({
            [Theme.DARK]: logoLight,
            [Theme.LIGHT]: logo,
            [Theme.OBSIDIAN]: logoLight,
            [Theme.NEW]: logo,
          })}
          theme={props.theme}
          name={LOGO_TEXT}
        />
        <span className={styles.loaderLine} />
      </VerticalContainer>
    );
};
