/**
 * Please add clear and descriptive comment for all events and their fields,
 * because they will be used in unpredictable places and with comments it will be easier to
 * understand context and meaning of event.
 */

import {ChannelId} from "src/eventBus/EventBusChannelDict";
import {populateWithBaseEvent} from "src/eventBus/events/populateWithBaseEvent";
import {TempExampleEventId} from "src/eventBus/events/tempExample/TempExampleEventDict";

/**
 * Event fired when a document creation is initiated
 *
 * Usually fired when a user clicks on a button to create a document
 */
export type TempExampleCreationInitiatedPayload = {

  /**
   * Example field
   */
  // example: string;
};

/**
 * Factory for {@link DocumentCreationInitiatedPayload} event
 * Used for creating new event objects
 */
export const makeTempExampleCreationInitiatedEvent = (payload: TempExampleCreationInitiatedPayload) => {
  const populatedEvent = populateWithBaseEvent(
    payload,
    ChannelId.TEMP_EXAMPLE,
    TempExampleEventId.TEMP_EXAMPLE_CREATION_INITIATED,
    {
      isListenInOnlyCurrentTab: true,
      windowId: String(Math.random()),
    },
  );

  return populatedEvent;
};
