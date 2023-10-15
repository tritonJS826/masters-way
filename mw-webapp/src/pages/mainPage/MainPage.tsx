import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {ReportsTable} from "src/pages/reportsTable/ReportsTable";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {UserService} from "src/service/UserService";
import styles from "src/pages/mainPage/MainPage.module.scss";

/**
 * Main page with common title and {@link Table} of dayReports
 * @returns title and {@link Table}
 */
export const MainPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [ways, setWays] = useState<string[] | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  /**
   * Get owned Ways of authorized user
   */
  const getUserWays = async (uuid: string) => {
    const foundUser = await UserService.getUserDTO(uuid);
    setWays(foundUser.ownWays);
  };

  useEffect(() => {
    if (user) {
      getUserWays(user.uid);
    } else {
      setWays(null);
    }
  }, [user],
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Hiii, Student!
      </h1>
      <>
        {ways
          ? (
            ways.map((wayUuid) => (
              <>
                <h4>
                  Table for
                  &quot;
                  {wayUuid}
                  &quot;
                  way
                </h4>
                <ReportsTable
                  wayUuid={wayUuid}
                  key={wayUuid}
                />
              </>
            ))
          )
          : (
            <ReportsTable />
          )}
      </>
    </div>
  );
};
