import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const authObject = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  useEffect(() => {
    if (authObject.currentUser) {
      localStorage.setItem("auth", "true");
      const historyPath = sessionStorage.getItem("path");
      if (historyPath) {
        sessionStorage.removeItem("path");

        navigate(historyPath);
      }
    }
  }, [authObject.currentUser]);

  return (
    <>
      <Header user={user} />
      <Router />
    </>
  );
};
