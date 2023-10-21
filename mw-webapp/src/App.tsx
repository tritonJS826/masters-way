import {useEffect, useState} from "react";
import {getAuth, User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const isAuth = getAuth();
  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  useEffect(() => {
    if (isAuth.currentUser) {
      localStorage.setItem("auth", "true");
    }
  }, [isAuth.currentUser]);

  return (
    <>
      <Header user={user} />
      <Router />
    </>
  );
};
