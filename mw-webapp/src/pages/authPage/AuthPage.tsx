import {User} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {handleUserCredentials} from "src/utils/auth/handleUserCredentials";
import {handleUserAuthState} from "src/utils/auth/handleUserAuthState";
import {handleLogIn} from "src/utils/auth/handleLogIn";
import {handleLogOut} from "src/utils/auth/handleLogOut";

const BUTTON_LOG_IN_VALUE = "Login";
const BUTTON_LOG_OUT_VALUE = "Logout";
const LINK_TEXT = "Workflow";
const MAIN_PATH = "/main";

export const AuthPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    handleUserAuthState(setUser);
    handleUserCredentials();
  }, []);

  return (
    <>
      {user ?
        navigate(MAIN_PATH) : (
          <>
            <Button
              value={user ? BUTTON_LOG_OUT_VALUE : BUTTON_LOG_IN_VALUE}
              onClick={user ? handleLogOut : handleLogIn}
            />
            <Link to={MAIN_PATH}>
              {LINK_TEXT}
            </Link>
          </>
        )}
    </>
  );
};
