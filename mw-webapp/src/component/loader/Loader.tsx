import logo from "src/assets/mastersWayLogo.svg";
import {Image} from "src/component/image/Image";
import styles from "src/component/loader/Loader.module.scss";

/**
 * Loader component
 * Used for page loading
 */
export const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Image
        src={logo}
        alt="Loading image"
        className={styles.loader}
      />
    </div>
  );
};
