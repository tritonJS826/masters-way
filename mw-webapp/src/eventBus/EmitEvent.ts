import {eventBus} from "src/eventBus/eventBus";
import type {ChannelId, EventBusChannelDict} from "src/eventBus/EventBusChannelDict";
import type {BaseEventParams} from "src/eventBus/events/populateWithBaseEvent";

/**
 * Method for emitting specific event to event bus
 */
export const emitEvent = <Channel extends ChannelId, EventId extends keyof EventBusChannelDict[Channel]>(
  event: BaseEventParams<Channel, EventId>,
) => {
  eventBus.emitEvent(event);
};
