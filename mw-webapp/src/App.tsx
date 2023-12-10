import {useEffect, useState} from "react";
import {Header} from "src/component/header/Header";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {globalContext} from "src/GlobalContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {Router} from "src/router/Router";
import {AuthService} from "src/service/AuthService";

/**
 * App
 */
export const App = () => {
  useErrorHandler();
  const [user, setUser] = useState<UserPreview | null>(null);

  /**
   * OnLog in
   */
  const onLogIn = async (value: string) => {
    const currentUserPreview = await UserPreviewDAL.getUserPreview(value);
    setUser(currentUserPreview);
  };

  /**
   * OnLog out
   */
  const onLogOut = async () => {
    setUser(null);
  };

  useEffect(() => {
    AuthService.listenAuthStateChange({onLogIn, onLogOut});
  }, []);

  return (

    <globalContext.Provider value={{user}}>
      <Header />
      <Router />
    </globalContext.Provider>
  );
};
