import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {HeadingLevel, Title} from "src/component/title/Title";
import {OwnedWaysTable} from "src/pages/userPage/OwnedWaysTable";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import styles from "src/pages/userPage/UserPage.module.scss";

/**
 * Default page for authorized User
 */
export const UserPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <div className={styles.container}>
      <Title
        text="Owned ways"
        level={HeadingLevel.h2}
        className={""}
      />
      {user ? <OwnedWaysTable user={user} /> : null}
    </div>
  );
};