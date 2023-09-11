import {Link} from "react-router-dom";
import styles from "src/component/link/Link.module.scss";

interface LnkProps {
  /**
   * Link value (text)
   */
  value: string;
  /**
   * Go to path page on link
   */
  path: string;
}

export const Lnk: React.FC<LnkProps> = (props: LnkProps) => {
  return (
    <Link
      className={styles.link}
      to={props.path}
    >
      {props.value}
    </Link>
  );
};