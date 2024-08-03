import {
  displayNotification,
  NotificationType,
} from "src/component/notification/displayNotification";
import {emitEvent} from "src/eventBus/EmitEvent";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {ChatMessageReceivedPayload} from "src/eventBus/events/chat/ChatEvents";
import {tokenStore} from "src/globalStore/TokenStore";
import {BaseSocketEvent} from "src/service/socket/BaseSocketEvent";
import {env} from "src/utils/env/env";

/**
 * Connect to mw-chat-websocket
 */
export const connectChatSocket = () => {
  const exampleSocket = new WebSocket(
    env.API_MW_CHAT_WEBSOCKET_PATH +
      `?token=${encodeURIComponent(tokenStore.accessToken ?? "")}`,
  );

  /**
   * Handler triggered on connection open
   */
  exampleSocket.onopen = () => {
    emitEvent({
      channelId: ChannelId.CHAT,
      eventId: ChatEventId.CONNECTION_ESTABLISHED,
      payload: {},
    });
  };

  /**
   * Handler triggered on connection close
   */
  exampleSocket.onclose = () => {
    emitEvent({
      channelId: ChannelId.CHAT,
      eventId: ChatEventId.CONNECTION_CLOSED,
      payload: {},
    });
  };

  /**
   * Handler triggered on error with websocket
   */
  exampleSocket.onerror = () => {
    displayNotification({
      text: "Chat websocket error! Try to reconnect!",
      type: NotificationType.ERROR,
    });
  };

  /**
   * Message handlers
   */
  exampleSocket.onmessage = (eventRaw: MessageEvent<string>) => {
    const event = new BaseSocketEvent(JSON.parse(eventRaw.data));

    switch (event.type) {
      case "mw-chat-websocket:message-received":
        emitEvent({
          channelId: ChannelId.CHAT,
          eventId: ChatEventId.MESSAGE_RECEIVED,
          payload: event.payload as ChatMessageReceivedPayload,
        });
        break;
      default:
        displayNotification({
          type: NotificationType.ERROR,
          text: "Undefined message name",
        });
    }
  };
};
