import {useEffect, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {User} from "firebase/auth";
import {Button} from "src/component/button/Button";
import {pages} from "src/router/pages";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";
import {logIn} from "src/service/auth/logIn";
import {logOut} from "src/service/auth/logOut";
import {writeNewUserCredentials} from "src/service/auth/writeNewUserCredentials";

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
          onClick={user ? logOut : logIn}
        />
        <Link to={pages.main.path}>
          {LINK_TEXT}
        </Link>
      </>
    </>
  );
};
