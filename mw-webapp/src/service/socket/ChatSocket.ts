import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {emitEvent} from "src/eventBus/EmitEvent";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {ChatMessageReceivedPayload} from "src/eventBus/events/chat/ChatEvents";

/**
 * Base socket event
 */
class BaseSocketEvent {

  /**
   * Event name. Format:  microservice:event-name
   * Example: "mw-chat-websocket:message-received"
   */
  public name: string;

  /**
   * Event payload
   */
  public payload: object;

  constructor(params: BaseSocketEvent) {
    this.name = params.name;
    this.payload = params.payload;
  }

}

/**
 * A
 */
export const connectChatSocket = () => {
  const exampleSocket = new WebSocket("ws://localhost:7994/ws");

  /**
   * A
   */
  exampleSocket.onopen = () => {
    emitEvent({
      channelId: ChannelId.CHAT,
      eventId: ChatEventId.CONNECTION_ESTABLISHED,
      payload: {text: "Connection established"},
    });
  };

  /**
   * Message handlers
   */
  exampleSocket.onmessage = (eventRaw: MessageEvent<BaseSocketEvent>) => {
    const event = new BaseSocketEvent(eventRaw.data);

    switch (event.name) {
      case "mw-chat-websocket:message-received":
        emitEvent({
          channelId: ChannelId.CHAT,
          eventId: ChatEventId.MESSAGE_RECEIVED,
          payload: event.payload as ChatMessageReceivedPayload,
        });
        break;
      default:
        displayNotification({type: NotificationType.ERROR, text: "Undefined message name"});
    }
  };

  /**
   * A
   */
  exampleSocket.onclose = () => {
    // Console.log("WebSocket is closed now.");
  };

  /**
   * A
   */
  exampleSocket.onerror = () => {
    // Console.log("WebSocket error:", error);
  };
};
