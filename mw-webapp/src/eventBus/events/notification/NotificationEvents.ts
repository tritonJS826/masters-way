/**
 * Please add clear and descriptive comment for all events and their fields,
 * because they will be used in unpredictable places and with comments it will be easier to
 * understand context and meaning of event.
 */
import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";
import {currentWindowEventConfig} from "src/eventBus/eventBus";
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {NotificationEventId} from "src/eventBus/events/notification/NotificationEventDict";
import {populateWithBaseEvent} from "src/eventBus/events/populateWithBaseEvent";

/**
 * Event fired when a notification received from websocket
 */
export type NotificationMessageReceivedPayload = {

  /**
   * Date when Notification was created
   */
  createdAt: Date;

  /**
   * If true - notification was read
   */
  isRead: boolean;

  /**
   * Nature of the notification (like jobDone created, mentor request applied etc.)
   */
  nature: NotificationNature;

  /**
   * Path to info mentioned in the notification
   */
  url: string;

  /**
   * User UUID that mentioned in the notification
   */
  userUuid: string;

  /**
   * Notification's description
   */
  description: string;

  /**
   * Notification's UUID
   */
  uuid: string;

};

/**
 * Factory for {@link NotificationMessageReceivedPayload} event
 * Used for creating new event objects
 */
export const makeNotificationMessageReceivedEvent = (payload: NotificationMessageReceivedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.NOTIFICATION,
    NotificationEventId.NOTIFICATION_RECEIVED,
    currentWindowEventConfig,
  );

  return populatedEvent;
};

/**
 * Event fired when a connection to mw-notification-websocket established
 */
export type NotificationConnectionEstablishedPayload = Record<string, never>;

/**
 * Factory for {@link NotificationConnectionEstablishedPayload} event
 * Used for creating new event objects
 */
export const makeNotificationConnectionEstablishedEvent = (payload: NotificationConnectionEstablishedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.NOTIFICATION,
    NotificationEventId.CONNECTION_ESTABLISHED,
    currentWindowEventConfig,
  );

  return populatedEvent;
};

/**
 * Event fired when a connection to mw-notification-websocket closed
 */
export type NotificationConnectionClosedPayload = Record<string, never>;

/**
 * Factory for {@link NotificationConnectionEstablishedPayload} event
 * Used for creating new event objects
 */
export const makeNotificationConnectionClosedEvent = (payload: NotificationConnectionClosedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.NOTIFICATION,
    NotificationEventId.CONNECTION_CLOSED,
    currentWindowEventConfig,
  );

  return populatedEvent;
};
