import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {HeadingLevel, Title} from "src/component/title/Title";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import styles from "src/component/header/Header.module.scss";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LOGO_TEXT = "master's way";

/**
 * Header component
 */
export const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <div className={styles.header}>
      <Title
        level={HeadingLevel.h1}
        text={LOGO_TEXT.toUpperCase()}
      />
      {user &&
        <Title
          level={HeadingLevel.h2}
          text={`Hello, ${user.displayName}!`}
        />
      }
      <Button
        onClick={user ? logOut : logIn}
        value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
      />
    </div>
  );
};