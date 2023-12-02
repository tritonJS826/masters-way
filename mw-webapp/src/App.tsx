import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {UserContext} from "src/component/header/UserContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  useErrorHandler();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <>
      <UserContext.Provider value={{user}}>
        <Header />
        <Router />
      </UserContext.Provider>
    </>
  );
};
