import {PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useGlobalContext} from "src/GlobalContext";
import {userStore} from "src/globalStore/UserStore";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {User} from "src/model/businessModel/User";
import {pages} from "src/router/pages";
import {AuthService} from "src/service/AuthService";

/**
 * Check is current page is home page
 */
const getIsHomePage = () => pages.home.getPath({}) === location.pathname;

/**
 *InitializationApp
 */
export const InitializedApp = (props: PropsWithChildren) => {
  useErrorHandler();
  const {setUser} = userStore;
  const {isInitialized, setIsInitialized} = useGlobalContext();
  const navigate = useNavigate();

  /**
   * Get default page path
   */
  const getDefaultPagePath = (userUid: string | null) => {
    return userUid
      ? pages.user.getPath({uuid: userUid})
      : pages.home.getPath({});
  };

  /**
   * OnLog in
   */
  const onLogIn = (user: User) => {
    setUser(user);
    const defaultPagePath = getDefaultPagePath(user.uuid);

    if (getIsHomePage()) {
      navigate(defaultPagePath);
    }
  };

  /**
   * OnLog out
   */
  const onLogOut = () => {
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
