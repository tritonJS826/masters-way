import {useEffect} from "react";
import {eventBus} from "src/eventBus/eventBus";
import type {ChannelId, EventBusChannelDict} from "src/eventBus/EventBusChannelDict";

/**
 * Hook for listening specific event in specific channel from event bus
 * @param {EventBusChannel} channel Channel for listening
 * @param {EventId} eventId Event id for listening
 */
export const useListenEventBus = <Channel extends ChannelId, EventId extends keyof EventBusChannelDict[Channel]>(
  channelId: Channel,
  eventId: EventId,
  handler: (payload: EventBusChannelDict[Channel][EventId]) => void,
) => {
  useEffect(() => eventBus.subscribe(channelId, eventId, handler), [channelId, eventId, handler]);
};
