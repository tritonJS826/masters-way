import {PropsWithChildren, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AuthDAL} from "src/dataAccessLogic/AuthDAL";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {useListenEventBus} from "src/eventBus/useListenEvent";
import {useGlobalContext} from "src/GlobalContext";
import {notificationStore} from "src/globalStore/NotificationStore";
import {tokenStore} from "src/globalStore/TokenStore";
import {userStore} from "src/globalStore/UserStore";
import {useErrorHandler} from "src/hooks/useErrorHandler";
import {pages} from "src/router/pages";
import {resetAuthData} from "src/service/services";
import {connectChatSocket} from "src/service/socket/ChatSocket";
// Import {connectNotificationSocket} from "src/service/socket/NotificationSocket";

const ACCESS_TOKEN_SEARCH_PARAM = "accessToken";
const REFRESH_TOKEN_SEARCH_PARAM = "refreshToken";

/**
 * Check is current page is home page
 */
const getIsHomePage = () => pages.home.getPath({}) === location.pathname;

/**
 * InitializationApp
 */
export const InitializedApp = (props: PropsWithChildren) => {
  useErrorHandler();
  const {user, setUser} = userStore;
  const {isInitialized, setIsInitialized} = useGlobalContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!user) {
      // TODO: move here method to clear UserStore instead of clear store in Layout.tsx
      notificationStore.clearNotificationStore();

      return;
    }

    const socket = connectChatSocket();
    // Const notificationSocket = connectNotificationSocket();

    return () => {
      socket.close();
      // NotificationSocket.close();
    };
  }, [user?.uuid]);

  useListenEventBus(ChannelId.CHAT, ChatEventId.REFRESH_TOKEN_REQUIRED, async () => {
    if (!tokenStore.refreshToken) {
      resetAuthData();
    } else {
      await AuthDAL.refreshToken(tokenStore.refreshToken);
    }
  });

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
    const accessTokenFromUrl = searchParams.get(ACCESS_TOKEN_SEARCH_PARAM);
    const refreshTokenFromUrl = searchParams.get(REFRESH_TOKEN_SEARCH_PARAM);

    searchParams.delete(ACCESS_TOKEN_SEARCH_PARAM);
    searchParams.delete(REFRESH_TOKEN_SEARCH_PARAM);
    setSearchParams(searchParams);
    if (accessTokenFromUrl && refreshTokenFromUrl) {
      tokenStore.setTokens({
        accessToken: accessTokenFromUrl,
        refreshToken: refreshTokenFromUrl,
      });
    }

    if (!tokenStore.accessToken) {
      // No tokens - no actions
      return;
    }
    // TODO: loadUser if some token exist
    try {
      const loadedUser = await AuthDAL.getAuthorizedUser();
      setUser(loadedUser);
      const defaultPagePath = getDefaultPagePath(loadedUser.uuid);
      setIsInitialized(true);

      if (getIsHomePage()) {
        navigate(defaultPagePath);
      }
    } catch {
      resetAuthData();
    }

  };

  useEffect(() => {
    if (!isInitialized) {
      recoverSessionIfPossible();
    }
  }, []);

  return props.children;
};
