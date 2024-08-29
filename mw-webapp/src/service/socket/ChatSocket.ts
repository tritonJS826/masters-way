import {
  displayNotification,
  NotificationType,
} from "src/component/notification/displayNotification";
import {emitEvent} from "src/eventBus/EmitEvent";
import {
  ChatMessageReceivedPayload,
  ChatRoomCreatedPayload,
  makeChatConnectionClosedEvent,
  makeChatConnectionEstablishedEvent,
  makeChatMessageReceivedEvent,
  makeChatRoomCreatedEvent,
} from "src/eventBus/events/chat/ChatEvents";
import {serviceWorkerStore, SystemNotificationTag} from "src/globalStore/ServiceWorkerStore";
import {tokenStore} from "src/globalStore/TokenStore";
import {BaseSocketEvent} from "src/service/socket/BaseSocketEvent";
import {env} from "src/utils/env/env";

const RECONNECT_INTERVAL = 3000;

/**
 * Connect to mw-chat-websocket
 */
export const connectChatSocket = () => {
  const socket = new WebSocket(
    env.API_MW_CHAT_WEBSOCKET_PATH +
      `?token=${encodeURIComponent(tokenStore.accessToken ?? "")}`,
  );

  /**
   * Handler triggered on connection open
   */
  socket.onopen = () => {
    emitEvent(makeChatConnectionEstablishedEvent({}));
  };

  /**
   * Handler triggered on connection close
   */
  socket.onclose = () => {
    emitEvent(makeChatConnectionClosedEvent({}));

    setTimeout(() => {
      connectChatSocket();
    }, RECONNECT_INTERVAL);
  };

  /**
   * Handler triggered on error with websocket
   */
  socket.onerror = () => {
    displayNotification({
      text: "Chat websocket error! Try to reconnect!",
      type: NotificationType.ERROR,
    });
  };

  /**
   * Message handlers
   */
  socket.onmessage = (eventRaw: MessageEvent<string>) => {
    const event = new BaseSocketEvent(JSON.parse(eventRaw.data));

    switch (event.type) {
      case "mw-chat-websocket:message-received":
        emitEvent(makeChatMessageReceivedEvent(event.payload as ChatMessageReceivedPayload));
        serviceWorkerStore.systemNotification({
          title: "New message!",
          text: (event.payload as ChatMessageReceivedPayload).message,
          tag: SystemNotificationTag.TEST,
        });
        break;
      case "mw-chat-websocket:room-created":
        emitEvent(makeChatRoomCreatedEvent(event.payload as ChatRoomCreatedPayload));
        break;
      default:
        displayNotification({
          type: NotificationType.ERROR,
          text: "Undefined message name",
        });
    }
  };

  return socket;
};
