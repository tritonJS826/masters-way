import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Header} from "src/component/header/Header";
import {UserPreviewDAL} from "src/dataAccessLogic/UserPreviewDAL";
import {DEFAULT_NOTIFICATION_SETTINGS, globalContext} from "src/GlobalContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {pages} from "src/router/pages";
import {Router} from "src/router/Router";
import {AuthService} from "src/service/AuthService";
import {ThemeWorker} from "src/utils/ThemeWorker";

/**
 * App
 */
export const App = () => {
  ThemeWorker.loadTheme();
  useErrorHandler();
  const [user, setUser] = useState<UserPreview | null>(null);
  const navigate = useNavigate();
  const isHomePage = pages.home.getPath({}) === location.pathname;

  /**
   * Get default page path
   */
  const getDefaultPagePath = (userUid: string | null) => {
    return userUid ? pages.user.getPath({uuid: userUid}) : pages.allWays.getPath({});
  };

  /**
   * OnLog in
   */
  const onLogIn = async (userUid: string) => {
    const currentUserPreview = await UserPreviewDAL.getUserPreview(userUid);
    setUser(currentUserPreview);
    const defaultPagePath = getDefaultPagePath(userUid);

    if (isHomePage) {
      navigate(defaultPagePath);
    }
  };

  /**
   * OnLog out
   */
  const onLogOut = async () => {
    setUser(null);
    const defaultPagePath = getDefaultPagePath(null);

    if (isHomePage) {
      navigate(defaultPagePath);
    }
  };

  useEffect(() => {
    AuthService.listenAuthStateChange({onLogIn, onLogOut});
  }, []);

  return (

    <globalContext.Provider value={{
      user,
      setUser,
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
    }}
    >
      <Header />
      <Router />
    </globalContext.Provider>
  );
};
