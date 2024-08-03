/**
 * Please add clear and descriptive comment for all events and their fields,
 * because they will be used in unpredictable places and with comments it will be easier to
 * understand context and meaning of event.
 */
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {populateWithBaseEvent} from "src/eventBus/events/populateWithBaseEvent";

/**
 * Event fired when a message received from websocket
 */
export type ChatMessageReceivedPayload = {

  /**
   * Message text
   */
  text: string;

};

/**
 * Factory for {@link ChatMessageReceivedPayload} event
 * Used for creating new event objects
 */
export const makeChatMessageReceivedEvent = (payload: ChatMessageReceivedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.CHAT,
    ChatEventId.MESSAGE_RECEIVED,
  );

  return populatedEvent;
};

/**
 * Event fired when a connection to mw-chat-websocket established
 */
export type ChatConnectionEstablishedPayload = Record<string, never>;

/**
 * Factory for {@link ChatConnectionEstablishedPayload} event
 * Used for creating new event objects
 */
export const makeChatConnectionEstablishedEvent = (payload: ChatConnectionEstablishedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.CHAT,
    ChatEventId.CONNECTION_ESTABLISHED,
  );

  return populatedEvent;
};

/**
 * Event fired when a connection to mw-chat-websocket closed
 */
export type ChatConnectionClosedPayload = Record<string, never>;

/**
 * Factory for {@link ChatConnectionEstablishedPayload} event
 * Used for creating new event objects
 */
export const makeChatConnectionClosedEvent = (payload: ChatConnectionClosedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.CHAT,
    ChatEventId.CONNECTION_CLOSED,
  );

  return populatedEvent;
};
