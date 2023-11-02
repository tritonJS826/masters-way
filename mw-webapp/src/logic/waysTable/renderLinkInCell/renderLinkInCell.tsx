import {Link} from "src/component/link/Link";
import styles from "src/logic/waysTable/renderLinkInCell/renderLinkInCell.module.scss";

/**
 * Render link inside cell
 */
export const renderLinkInCell = (path: string, value: string) => {
  return (
    <Link
      value={value}
      path={path}
      className={styles.link}
    />
  );
};