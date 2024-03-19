import {PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {UserDAL} from "src/dataAccessLogic/UserDAL";
import {useGlobalContext} from "src/GlobalContext";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";
import {ThemeWorker} from "src/utils/ThemeWorker";

/**
 * Check is current page is home page
 */
const getIsHomePage = () => pages.home.getPath({}) === location.pathname;

/**
 *InitializationApp
 */
export const InitializedApp = (props: PropsWithChildren) => {
  ThemeWorker.loadTheme();
  useErrorHandler();
  const {setUser, isInitialized, setIsInitialized} = useGlobalContext();
  const navigate = useNavigate();

  /**
   * Get default page path
   */
  const getDefaultPagePath = (userUid: string | null) => {
    return userUid
      ? pages.user.getPath({uuid: userUid})
      : pages.allWays.getPath({});
  };

  /**
   * OnLog in
   */
  const onLogIn = async (userUid: string) => {
    const currentUserPreview = await UserDAL.getUserByUuid(userUid);
    setUser(currentUserPreview);
    const defaultPagePath = getDefaultPagePath(userUid);

    if (getIsHomePage()) {
      navigate(defaultPagePath);
    }
  };

  /**
   * OnLog out
   */
  const onLogOut = async () => {
    setUser(null);
    const defaultPagePath = getDefaultPagePath(null);

    if (getIsHomePage()) {
      navigate(defaultPagePath);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      AuthService.listenAuthStateChange({onLogIn, onLogOut});
      setIsInitialized(true);
    }
  }, []);

  return props.children;
};
