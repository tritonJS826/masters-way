import {Link} from "react-router-dom";
import styles from "src/logic/welcomePage/WelcomePage.module.scss";

export const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <Link to={"/"}>
        <button className={styles.button}>
          Sign In
        </button>
      </Link>
      <Link to={"/"}>
        <button className={styles.button}>
          Sign Up
        </button>
      </Link>
      <Link to={"main"}>
        <button className={styles.button}>
          Workflow Page
        </button>
      </Link>
    </div>
  );
};
