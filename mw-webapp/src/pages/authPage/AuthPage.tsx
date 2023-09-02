import {Link} from "react-router-dom";
import styles from "src/pages/authPage/AuthPage.module.scss";

export const AuthPage = () => {
  return (
    <div className={styles.container}>
      <Link to={"sign-in"}>
        <button>
          Sign In
        </button>
      </Link>
      <Link to={"sign-up"}>
        <button>
          Sign Up
        </button>
      </Link>
      <Link to={"main"}>
        <button>
          Workflow Page
        </button>
      </Link>
    </div>
  );
};
