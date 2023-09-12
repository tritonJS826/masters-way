import {Lnk} from "../link/Link";
import styles from "src/component/header/Header.module.scss";
import {useAuth} from "src/utils/useAuth";
import {Button} from "../button/Button";


export const Header = () => {
  const handleGoogleSignIn = useAuth();
  const buttonValue = "Sign in with Google";
  const linkValue = "Workflow";
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <p>
          MASTERS-WAY
        </p>
      </div>
      <div className={styles.block_button}>
        <Button
          onClick={handleGoogleSignIn}
          value={buttonValue}
        />
        <Lnk
          path={"main"}
          value={linkValue}
        />
      </div>
    </div>
  );
};
