import {Fragment, useEffect, useState} from "react";
import {User} from "firebase/auth";
import {ReportsTable} from "src/pages/reportsTable/ReportsTable";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {UserService} from "src/service/UserService";

/**
 * Default page for authorized User
 */
export const UserPage = () => {
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
  }, [user]);

  return (
    <>
      {ways
        ? (
          ways.map((wayUuid) => (
            <Fragment key={wayUuid}>
              <h4>
                Table for
                &quot;
                {wayUuid}
                &quot;
                way
              </h4>
              <ReportsTable wayUuid={wayUuid} />
            </Fragment>
          ))
        )
        : (
          null
        )}
    </>
  );
};