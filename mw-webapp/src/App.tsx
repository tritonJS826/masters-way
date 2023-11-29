import {useEffect, useState} from "react";
import {User} from "firebase/auth";
import {Header} from "src/component/header/Header";
import {UserContext} from "src/component/header/UserContext";
import {useErrorNotification} from "src/hooks/useErrorNotification";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  const {ErrorNotification} = useErrorNotification();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  return (
    <>
      {ErrorNotification}
      <UserContext.Provider value={{user}}>
        <Header />
        <Router />
      </UserContext.Provider>
    </>
  );
};
