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
  makeChatMetaInfoReceivedEvent,
  makeChatRefreshTokenRequiredEvent,
  makeChatRoomCreatedEvent,
} from "src/eventBus/events/chat/ChatEvents";
import {serviceWorkerStore, SystemNotificationTag} from "src/globalStore/ServiceWorkerStore";
import {tokenStore} from "src/globalStore/TokenStore";
import {chatStore} from "src/logic/chat/ChatStore";
import {ChatService} from "src/service/ChatService";
import {BaseSocketEvent} from "src/service/socket/BaseSocketEvent";
import {
  BASE_RECONNECT_INTERVAL,
  HTTP_AUTHENTICATION_FAILED_CODE,
  MAX_RECONNECT_INTERVAL, MULTIPLICAND,
} from "src/service/socket/SocketConfig";
import {env} from "src/utils/env/env";

const {setUnreadMessagesAmount} = chatStore;
let currentReconnectInterval = BASE_RECONNECT_INTERVAL;

/**
 * Connect to mw-chat-websocket
 */
export const connectChatSocket = (isReconnect = false) => {
  const socket = new WebSocket(
    env.API_MW_CHAT_WEBSOCKET_PATH +
      `?token=${encodeURIComponent(tokenStore.accessToken ?? "")}`,
  );

  /**
   * Handler triggered on connection open
   */
  socket.onopen = async () => {
    emitEvent(makeChatConnectionEstablishedEvent({}));
    currentReconnectInterval = BASE_RECONNECT_INTERVAL;

    if (isReconnect) {
      const metaInfo = await ChatService.getChatPreview();
      emitEvent(makeChatMetaInfoReceivedEvent(metaInfo));

      if (chatStore.activeRoomStore?.activeRoom) {
        const roomId = chatStore.activeRoomStore.activeRoom.roomId;
        chatStore.initiateActiveRoomStore(roomId);
      } else {
        setUnreadMessagesAmount(metaInfo.unreadMessagesAmount);
      }
    }
  };

  /**
   * Handler triggered on connection close
   */
  socket.onclose = (event: CloseEvent) => {
    if (event.code === HTTP_AUTHENTICATION_FAILED_CODE) {
      emitEvent(makeChatRefreshTokenRequiredEvent({}));
    }

    emitEvent(makeChatConnectionClosedEvent({}));

    setTimeout(() => connectChatSocket(true), currentReconnectInterval);

    currentReconnectInterval = Math.min(currentReconnectInterval * MULTIPLICAND, MAX_RECONNECT_INTERVAL);
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
