import {Link} from "react-router-dom";
import styles from "src/component/link/Link.module.scss";

interface LnkProps {
  /**
   * Link UUID
   */
  id?: string;
  /**
   * Link value (text)
   */
  value: string;
  /**
   * Callback triggered on link click
   */
  path: string;
}

export const LinkComponent: React.FC<LnkProps> = (props: LnkProps) => {
  return (
    <p className={styles.link_container}>
      <Link
        id={props.id}
        className={styles.link}
        to={props.path}
      >
        {props.value}
      </Link>
    </p>
  );
};