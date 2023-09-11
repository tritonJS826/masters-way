import {User, getRedirectResult, onAuthStateChanged} from "firebase/auth";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "src/component/button/Button";
import {useAuth} from "src/utils/useAuth";

export const AuthPage = () => {
  const {handleLogIn, handleLogout, writeNewUserData, auth} = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleAuthState = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      handleAuthState();
    };
  }, []);

  useEffect(() => {
    const getNewUserCredentials = async () => {
      try {
        const userCredentials = await getRedirectResult(auth);
        if (userCredentials) {
          writeNewUserData(
            userCredentials.user.uid, userCredentials.user.email, userCredentials.user.displayName,
          );
          navigate("/main");
        } else {
          return;
        }
      } catch (error) {
        let errorMessage;
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        alert(errorMessage);
      }
    };
    return () => {
      getNewUserCredentials();
    };
  }, []);

  return (
    <>
      {user ? (
        <Button
          value="Logout"
          onClick={handleLogout}
        />
      ) : (
        <Button
          value="Sign in with Google"
          onClick={handleLogIn}
        />
      )}
      <Link to={"main"}>
        Workflow
      </Link>
    </>
  );
};
