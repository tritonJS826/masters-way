import {
  displayNotification,
  NotificationType,
} from "src/component/notification/displayNotification";
import {emitEvent} from "src/eventBus/EmitEvent";
import {
  makeNotificationConnectionClosedEvent,
  makeNotificationConnectionEstablishedEvent,
} from "src/eventBus/events/notification/NotificationEvents";
import {tokenStore} from "src/globalStore/TokenStore";
import {env} from "src/utils/env/env";

const RECONNECT_INTERVAL = 3000;

/**
 * Connect to mw-notification-websocket
 */
export const connectNotificationSocket = () => {
  const socket = new WebSocket(
    env.API_MW_NOTIFICATION_WEBSOCKET_PATH +
      `?token=${encodeURIComponent(tokenStore.accessToken ?? "")}`,
  );

  /**
   * Handler triggered on connection open
   */
  socket.onopen = () => {
    emitEvent(makeNotificationConnectionEstablishedEvent({}));
  };

  /**
   * Handler triggered on connection close
   */
  socket.onclose = () => {
    emitEvent(makeNotificationConnectionClosedEvent({}));

    setTimeout(() => {
      connectNotificationSocket();
    }, RECONNECT_INTERVAL);
  };

  /**
   * Handler triggered on error with websocket
   */
  socket.onerror = () => {
    displayNotification({
      text: "Notification websocket error! Try to reconnect!",
      type: NotificationType.ERROR,
    });
  };

  return socket;
};
