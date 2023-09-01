import {Link} from "react-router-dom";
import styles from "src/logic/welcomePage/WelcomePage.module.scss";

export const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>
        Sign In
      </button>
      <button className={styles.button}>
        Sign Out
      </button>
      <Link
        to={"main"}
      >
        <button className={styles.button}>
          Workflow Page
        </button>
      </Link>
    </div>
  );
};