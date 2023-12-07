import {useEffect, useMemo, useState} from "react";
import {Header} from "src/component/header/Header";
import {UserContext} from "src/component/header/UserContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {Router} from "src/router/Router";
import {handleUserAuthState} from "src/service/auth/handleUserAuthState";

/**
 * App
 */
export const App = () => {
  useErrorHandler();

  const [user, setUser] = useState<UserPreview | null>(null);

  useEffect(() => {
    handleUserAuthState(setUser);
  }, []);

  const userMemo = useMemo(() => ({user}), [user]);

  return (

    <UserContext.Provider value={userMemo}>
      <Header />
      <Router />
    </UserContext.Provider>

  );
};
