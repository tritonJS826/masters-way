/**
 * Please add clear and descriptive comment for all events and their fields,
 * because they will be used in unpredictable places and with comments it will be easier to
 * understand context and meaning of event.
 */
import {currentWindowEventConfig} from "src/eventBus/eventBus";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {ChatEventId} from "src/eventBus/events/chat/ChatEventDict";
import {populateWithBaseEvent} from "src/eventBus/events/populateWithBaseEvent";

/**
 * Users who already read message
 */
type MessageReader = {

  /**
   * User id
   */
  userId: string;

  /**
   * Message creator id
   */
  name: string;

  /**
   * Message creator
   */
  imageUrl: string;

  /**
   * Date when message was read by reader
   */
  readDate: string;
}

/**
 * Event fired when a message received from websocket
 */
export type ChatMessageReceivedPayload = {

  /**
   * Message's id
   */
  messageId: string;

  /**
   * Message creator user id
   */
  ownerId: string;

  /**
   * Message creator name
   */
  ownerName: string;

  /**
   * Message owner image url
   * example: "https://lh3.google.com/u/0/d/18oHI9KoiaYvd_UowHyqsJbDLLhmuxPxr=w1919-h1079-iv2"
   */
  ownerImageUrl: string;

  /**
   * Message text
   */
  message: string;

  /**
   * List of users who already read message
   */
  messageReaders: MessageReader[];

  /**
   * Room id for this message
   */
  roomId: string;

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
    currentWindowEventConfig,
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
    currentWindowEventConfig,
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
    currentWindowEventConfig,
  );

  return populatedEvent;
};

/**
 * Room type
 */
export enum RoomType {
  PRIVATE = "private",
  GROUP = "group"
}

/**
 * Event fired when a room in chat created
 */
export type ChatRoomCreatedPayload = {

  /**
   * Room id
   */
  roomId: string;

  /**
   * Room name
   */
  name: string;

  /**
   * Room image url
   */
  imageUrl: string;

  /**
   * Room type
   */
  roomType: RoomType;

  /**
   * Users list in the room
   */
  users: {

    /**
     * User Id
     */
    userId: string;

    /**
     * User name
     */
    name: string;

    /**
     * UserImage url
     */
    imageURL: string;

    /**
     * User role
     */
    role: string;
  }[];

  /**
   * Room messages
   */
  messages: {

    /**
     * Message owner id
     */
    ownerId: string;

    /**
     * Message owner name
     */
    ownerName: string;

    /**
     * Message image url
     */
    ownerImageUrl: string;

    /**
     * Message text
     */
    message: string;

    /**
     * Users who already read message
     */
    messageReaders: {

      /**
       * User Id
       */
      userId: string;

      /**
       * User name
       */
      ownerName: string;

      /**
       * User image url
       */
      ownerImageUrl: string;

      /**
       * Read date
       */
      readDate: string;
    }[];
  }[];
};

/**
 * Factory for {@link ChatConnectionEstablishedPayload} event
 * Used for creating new event objects
 */
export const makeChatRoomCreatedEvent = (payload: ChatRoomCreatedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.CHAT,
    ChatEventId.ROOM_CREATED,
    currentWindowEventConfig,
  );

  return populatedEvent;
};
