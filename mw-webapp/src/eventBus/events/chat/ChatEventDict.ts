import {
  ChatConnectionClosedPayload,
  ChatConnectionEstablishedPayload,
  ChatMessageReceivedPayload,
  ChatMetaInfoPayload,
  ChatRefreshTokenRequiredPayload,
  ChatRoomCreatedPayload,
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
  ROOM_CREATED = "MW_CHAT:ROOM_CREATED",
  REFRESH_TOKEN_REQUIRED = "MW_CHAT:REFRESH_TOKEN_REQUIRED",
  META_INFO_RECEIVED = "MW_CHAT:META_INFO_RECEIVED"
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

  /**
   * Room created
   */
  [ChatEventId.ROOM_CREATED]: ChatRoomCreatedPayload;

  /**
   * Refresh token required
   */
  [ChatEventId.REFRESH_TOKEN_REQUIRED]: ChatRefreshTokenRequiredPayload;

  /**
   +  * Meta info fetched after (re)connect (e.g., unread total).
   +  */
  [ChatEventId.META_INFO_RECEIVED]: ChatMetaInfoPayload;
};
