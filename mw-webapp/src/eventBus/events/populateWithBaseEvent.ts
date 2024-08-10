import type {ChannelId, EventBusChannelDict} from "src/eventBus/EventBusChannelDict";
import {EventConfig} from "src/eventBus/eventBusMechanism/EventConfig";

/**
 * Base event params.
 * All events should extends this interface.
 */
export type BaseEventParams<
  Channel extends ChannelId = ChannelId,
  EventId extends keyof EventBusChannelDict[Channel] = keyof EventBusChannelDict[Channel],
> = {

  /**
   * Channel id
   */
  channelId: Channel;

  /**
   * Event id.
   */
  eventId: EventId;

  /**
   * Event payload.
   */
  payload: EventBusChannelDict[Channel][EventId];

  /**
   * Event configuration and metadata
   */
  config: EventConfig;
};

/**
 * Populator for all base events.
 *
 * Should used inside all event factories.
 * Shouldn't use in other places directly.
 */
export const populateWithBaseEvent = <Channel extends ChannelId, EventId extends keyof EventBusChannelDict[Channel]>(
  payload: EventBusChannelDict[Channel][EventId],
  channelId: Channel,
  eventId: EventId,
  config: EventConfig,
) => ({
    payload,
    channelId,
    eventId,
    config,
  });
