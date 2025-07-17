import {ChatEventDict} from "src/eventBus/events/chat/ChatEventDict";
import {NotificationEventDict} from "src/eventBus/events/notification/NotificationEventDict";
import {TempExampleEventDict} from "src/eventBus/events/tempExample/TempExampleEventDict";
import {TestEventDict} from "src/eventBus/events/test/TestEventDict";

/**
 * List of all event bus channels
 * Every channel is abstraction for grouping business specific events
 */
export enum ChannelId {
  CHAT = "CHAT",
  TEST = "TEST",
  NOTIFICATION = "NOTIFICATION",
  // WAY = "WAY",
  TEMP_EXAMPLE = "TEMP_EXAMPLE"
}

/**
 * Dictionary for connecting channels and their events
 * Every channel is abstraction for grouping business specific events
 *
 * Key is channel id
 * Value is available events
 */
export type EventBusChannelDict = {

  /**
   * Chat dictionary
   */
  [ChannelId.CHAT]: ChatEventDict;

  /**
   * Test dictionary
   */
  [ChannelId.TEST]: TestEventDict;

  /**
   * Notification dictionary
   */
  [ChannelId.NOTIFICATION]: NotificationEventDict;

  /**
   * Way dictionary
   */
  // [ChannelId.WAY]: WayEventDict;

  /**
   * Example template
   */
  [ChannelId.TEMP_EXAMPLE]: TempExampleEventDict;

};
