import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {pages} from "src/router/pages";
import {handleLogIn} from "src/utils/auth/handleLogIn";
import {handleLogOut} from "src/utils/auth/handleLogOut";
import {handleUserAuthState} from "src/utils/auth/handleUserAuthState";
import {writeNewUserCredentials} from "src/utils/auth/writeNewUserCredentials";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LINK_TEXT = "Workflow";

export const AuthPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
    writeNewUserCredentials();
  }, []);

  return (
    <>
      {user && <Navigate to={pages.main.path} /> }
      <>
        <Button
          value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
          onClick={user ? handleLogOut : handleLogIn}
        />
        <Link to={pages.main.path}>
          {LINK_TEXT}
        </Link>
      </>
    </>
  );
};
