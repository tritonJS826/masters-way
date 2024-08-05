
/**
 * Event and event bus configuration
 */
export type EventConfig = {

    /**
     * Should be listened sent only in current tab (window)
     * @false by default
     */
    isListenInOnlyCurrentTab: boolean;

    /**
     * Window identifier
     * Use to prevent subscriptions from few different tabs in the same browser
     */
    windowId: string;
}
