import {PropsWithChildren, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {useGlobalContext} from "src/GlobalContext";
import {userStore} from "src/globalStore/UserStore";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {pages} from "src/router/pages";

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
  const [searchParams, setSearchParams] = useSearchParams();

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
  const recoverSessionIfPossible = async () => {
    const token = searchParams.get("token");
    searchParams.delete("token");
    setSearchParams(searchParams);

    if (!token) {
      return;
    }
    // TODO: loadUser if cookie "auth-session" exist
    try {
      const user = await AuthDAL.getAuthorizedUser(token);
      setUser(user);
      const defaultPagePath = getDefaultPagePath(user.uuid);
      setIsInitialized(true);

      if (getIsHomePage()) {
        navigate(defaultPagePath);
      }
    } catch {
      // eslint-disable-next-line no-console
      console.warn("Session not recovered");
    }

  };

  useEffect(() => {
    if (!isInitialized) {
      recoverSessionIfPossible();
    }
  }, []);

  return props.children;
};
