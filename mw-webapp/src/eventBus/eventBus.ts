import {EventBus} from "src/eventBus/eventBusMechanism/EventBus";
import {EventConfig} from "src/eventBus/eventBusMechanism/EventConfig";

/**
 * This config used for event bus and events which should be handled only in current window
 */
export const currentWindowEventConfig: EventConfig = {
  isListenInOnlyCurrentTab: true,
  windowId: String(Math.random()),
};

/**
 * Event bus instance
 */
export const eventBus = new EventBus(currentWindowEventConfig);
