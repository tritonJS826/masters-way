import {useEffect, useState} from "react";
import clsx from "clsx";
import {User} from "firebase/auth";
import {HeadingLevel, Title} from "src/component/title/Title";
import {AllWaysTable} from "src/logic/waysTable/AllWaysTable";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import styles from "src/logic/allWaysPage/AllWaysPage.module.scss";

/**
 * Ways page
 */
export const AllWaysPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <div>
      <Title
        level={HeadingLevel.h2}
        text="Ways page"
        className={clsx(styles.title, user ? styles.titleWhenLoggedIn : styles.titlePage)}
      />
      <AllWaysTable />
    </div>
  );
};
