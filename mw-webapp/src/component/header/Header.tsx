import {Lnk} from "../link/Link";
import styles from "src/component/header/Header.module.scss";
import {useAuth} from "src/utils/useAuth";
import {Button} from "../button/Button";

interface HeaderProps {
  id?: string;
}

export const Header: React.FC<HeaderProps> = () => {
  const handleGoogleSignIn = useAuth();
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
          value={"Sign in with Google"}
        />
        <Lnk
          path={"main"}
          value={"Workflow"}
        />
      </div>
    </div>
  );
};
