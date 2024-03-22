import logo from "src/assets/mastersWayLogo.svg";
import {Image} from "src/component/image/Image";
import styles from "src/component/loader/Loader.module.scss";

/**
 * Props for the Image component
 */
interface LoaderProps {

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
      <Image
        src={logo}
        alt="Loading image"
        className={styles.loader}
      />
    </div>
  );
};
