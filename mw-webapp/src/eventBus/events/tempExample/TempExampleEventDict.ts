import type {TempExampleCreationInitiatedPayload} from "src/eventBus/events/tempExample/TempExampleEvents";

/**
 * All event ids for documents channel.
 *
 * Every event should be business oriented, not technical.
 *
 * There is separate enum for every channel because events
 * should be unique for every channel.
 *
 * Include channel name in event name for debugging and uniqueness.
 */
export enum TempExampleEventId {
  TEMP_EXAMPLE_CREATION_INITIATED = "TEMP_EXAMPLE:TEMP_EXAMPLE_CREATION_INITIATED",
}

/**
 * Dictionary of all events for documents channel.
 * Key is event type, value is event payload.
 */
export type TempExampleEventDict = {

  /**
   * Example event description
   */
  [TempExampleEventId.TEMP_EXAMPLE_CREATION_INITIATED]: TempExampleCreationInitiatedPayload;
};
