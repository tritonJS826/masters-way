/**
 * Please add clear and descriptive comment for all events and their fields,
 * because they will be used in unpredictable places and with comments it will be easier to
 * understand context and meaning of event.
 */
import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {populateWithBaseEvent} from "src/eventBus/events/populateWithBaseEvent";
import {TempExampleEventId} from "src/eventBus/events/tempExample/TempExampleEventDict";

/**
 * Event fired when a message received from websocket
 */
export type ChatMessageReceivedPayload = {

  /**
   * Message text
   */
  text: string;

};

/**
 * Factory for {@link ChatMessageReceivedPayload} event
 * Used for creating new event objects
 */
export const makeChatMessageReceivedEvent = (payload: ChatMessageReceivedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.TEMP_EXAMPLE,
    TempExampleEventId.TEMP_EXAMPLE_CREATION_INITIATED,
  );

  return populatedEvent;
};

export type ChatMessageReceivedPayload2 = {

  /**
   * Message text
   */
  text2: string;

};

/**
 * Factory for {@link ChatMessageReceivedPayload} event
 * Used for creating new event objects
 */
export const makeChatMessageReceivedEvent2 = (payload: ChatMessageReceivedPayload2) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.TEMP_EXAMPLE,
    TempExampleEventId.TEMP_EXAMPLE_CREATION_INITIATED,
  );

  return populatedEvent;
};
