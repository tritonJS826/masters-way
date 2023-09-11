import {User} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {getNewUserCredentials} from "src/utils/auth/getNewUserCredentials";
import {handleUserAuthState} from "src/utils/auth/handleAuthState";
import {handleLogIn} from "src/utils/auth/handleLogIn";
import {handleLogOut} from "src/utils/auth/handleLogOut";

export const AuthPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      handleUserAuthState(setUser);
      getNewUserCredentials(navigate, "/main");
    };
  }, []);

  return (
    <>
      <Button
        value={user ? "Logout" : "Login"}
        onClick={user ? handleLogOut : handleLogIn}
      />
      <Link to={"main"}>
        Workflow
      </Link>
    </>
  );
};
