import {PropsWithChildren, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {useGlobalContext} from "src/GlobalContext";
import {tokenStore} from "src/globalStore/TokenStore";
import {userStore} from "src/globalStore/UserStore";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {pages} from "src/router/pages";
import {connectChatSocket} from "src/service/socket/ChatSocket";

const TOKEN_SEARCH_PARAM = "token";

/**
 * Check is current page is home page
 */
const getIsHomePage = () => pages.home.getPath({}) === location.pathname;

/**
 *InitializationApp
 */
export const InitializedApp = (props: PropsWithChildren) => {
  useErrorHandler();
  const {user, setUser} = userStore;
  const {isInitialized, setIsInitialized} = useGlobalContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!user) {
      return;
    }

    const socket = connectChatSocket();

    return () => {
      socket.close();
    };
  }, [user?.uuid]);

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
    const tokenFromUrl = searchParams.get(TOKEN_SEARCH_PARAM);
    searchParams.delete(TOKEN_SEARCH_PARAM);
    setSearchParams(searchParams);
    if (tokenFromUrl) {
      tokenStore.setAccessToken(tokenFromUrl);
    }

    if (!tokenStore.accessToken) {
      // No tokens - no actions
      return;
    }
    // TODO: loadUser if some token exist
    try {
      const loadedUser = await AuthDAL.getAuthorizedUser();
      setUser(user);
      const defaultPagePath = getDefaultPagePath(loadedUser.uuid);
      setIsInitialized(true);

      if (getIsHomePage()) {
        navigate(defaultPagePath);
      }
    } catch {
      tokenStore.setAccessToken(null);
    }

  };

  useEffect(() => {
    if (!isInitialized) {
      recoverSessionIfPossible();
    }
  }, []);

  return props.children;
};
