import {
  ChatConnectionClosedPayload,
  ChatConnectionEstablishedPayload,
  ChatMessageReceivedPayload,
} from "src/eventBus/events/chat/ChatEvents";

/**
 * All event ids for chat channel.
 *
 * Every event should be business oriented, not technical.
 *
 * There is separate enum for every channel because events
 * should be unique for every channel.
 *
 * Include channel name in event name for debugging and uniqueness.
 */
export enum ChatEventId {
  CONNECTION_ESTABLISHED = "MW_CHAT:CONNECTION_ESTABLISHED",
  CONNECTION_CLOSED = "MW_CHAT:CONNECTION_CLOSED",
  MESSAGE_RECEIVED = "MW_CHAT:MESSAGE_RECEIVED",
}

/**
 * Dictionary of all events for chat channel.
 * Key is event type, value is event payload.
 */
export type ChatEventDict = {

  /**
   * Message received from mw-chat-websocket
   */
  [ChatEventId.MESSAGE_RECEIVED]: ChatMessageReceivedPayload;

  /**
   * Connection to mw-chat-websocket established
   */
  [ChatEventId.CONNECTION_ESTABLISHED]: ChatConnectionEstablishedPayload;

  /**
   * Connections to mw-chat-websocket closed
   */
  [ChatEventId.CONNECTION_CLOSED]: ChatConnectionClosedPayload;
};
