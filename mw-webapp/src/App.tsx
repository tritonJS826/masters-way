import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {globalContext} from "src/GlobalContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {Router} from "src/router/Router";
import {AuthService} from "src/service/AuthService";

/**
 * App
 */
export const App = () => {
  useErrorHandler();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (user) {
      navigate(pages.user.getPath({uuid: user?.uuid}));
    }
  }, [user]);

  return (

    <globalContext.Provider value={{user}}>
      <Header />
      <Router />
    </globalContext.Provider>
  );
};
