import {ChannelId, EventBusChannelDict} from "src/eventBus/EventBusChannelDict";
import type {BaseEventParams} from "src/eventBus/events/populateWithBaseEvent";

/**
 * Low level event bus implementation
 * Don't use it directly in components, use "useEventBus hook instead
 * Could be used directly in services, for example on transport layer
 */
export class EventBus {

  /**
   * All available channels emitters
   *
   * Key is channel id
   * Value is broadcastChannel instance
   */
  private channelsEmitters: Record<keyof EventBusChannelDict, BroadcastChannel> = {} as Record<
    keyof EventBusChannelDict,
    BroadcastChannel
  >;

  /**
   * All available channels listeners
   *
   * Key is channel id
   * Value is broadcastChannel instance
   */
  private channelsListeners: Record<keyof EventBusChannelDict, BroadcastChannel> = {} as Record<
    keyof EventBusChannelDict,
    BroadcastChannel
  >;

  constructor() {
    this.channelsInitialization();
  }

  /**
   * Subscribe for specific channel for specific event
   * @param {ChannelId} channel Channel for listening
   * @param {keyof EventBusChannelDict[ChannelId]} eventId Event id for listening
   * @param handlerRaw Handler for event
   *
   * @returns Unsubscribe callback
   */
  public subscribe<Channel extends ChannelId, EventId extends keyof EventBusChannelDict[Channel]>(
    channel: Channel,
    eventId: EventId,
    handlerRaw: (payload: EventBusChannelDict[Channel][EventId]) => void,
  ) {

    /**
     * Handle event
     */
    const handler = (event: MessageEvent<BaseEventParams>) => {
      const isAppropriateToHandleEvent = event.data.eventId === eventId;
      if (isAppropriateToHandleEvent) {
        handlerRaw(event.data.payload);
      }
    };
    this.channelsListeners[channel].addEventListener("message", handler);

    /**
     * Unsubscribe from event
     */
    const unsubscribeCallback = () => {
      this.channelsListeners[channel].removeEventListener("message", handler);
    };

    return unsubscribeCallback;
  }

  /**
   * Emit event to specific channel
   * @param event event to Emit
   */
  public emitEvent<Channel extends ChannelId, EventId extends keyof EventBusChannelDict[Channel]>(
    event: BaseEventParams<Channel, EventId>,
  ) {
    this.channelsEmitters[event.channelId].postMessage(event);
  }

  /**
   * Channels initialization
   */
  private channelsInitialization() {
    Object.values(ChannelId).forEach((channelName) => {
      this.channelsEmitters[channelName] = new BroadcastChannel(channelName);
      this.channelsListeners[channelName] = new BroadcastChannel(channelName);
    });

    /**
     * Next line used for access to channels from browser console for debugging and testing purposes
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (window as any).channels = this.channelsEmitters;
  }

}
