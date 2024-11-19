import {
  NotificationConnectionClosedPayload,
  NotificationConnectionEstablishedPayload,
  NotificationMessageReceivedPayload,
} from "src/eventBus/events/notification/NotificationEvents";

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
export enum NotificationEventId {
  CONNECTION_ESTABLISHED = "MW_NOTIFICATION:CONNECTION_ESTABLISHED",
  CONNECTION_CLOSED = "MW_NOTIFICATION:CONNECTION_CLOSED",
  NOTIFICATION_RECEIVED = "MW_NOTIFICATION:NOTIFICATION_RECEIVED",
}

/**
 * Dictionary of all events for chat channel.
 * Key is event type, value is event payload.
 */
export type NotificationEventDict = {

  /**
   * Notification received from mw-notification-websocket
   */
  [NotificationEventId.NOTIFICATION_RECEIVED]: NotificationMessageReceivedPayload;

  /**
   * Connection to mw-notification-websocket established
   */
  [NotificationEventId.CONNECTION_ESTABLISHED]: NotificationConnectionEstablishedPayload;

  /**
   * Connections to mw-notification-websocket closed
   */
  [NotificationEventId.CONNECTION_CLOSED]: NotificationConnectionClosedPayload;

};
