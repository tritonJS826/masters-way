import {createContext, useContext} from "react";

/**
 * Default stub setIsInitialization
 */
const DEFAULT_SET_INITIALIZED = () => {
  throw Error("This is stub function for the initialization. This function should not be called");
};

export const DEFAULT_NOTIFICATION_SETTINGS: Notification = {
  isEnabled: true,
  // TODO: make it way-specific
  notificationTime: "21:00",
};

const DEFAULT_GLOBAL_CONTEXT = {
  isInitialized: false,
  setIsInitialized: DEFAULT_SET_INITIALIZED,
};

export type Notification = {

  /**
   * Is notifications enabled
   */
  isEnabled: boolean;

  /**
   * String in format hh:mm
   */
  notificationTime: string;
}

export type GlobalContext = {

  /**
   * IsInitialization
   */
  isInitialized: boolean;

  /**
   * SetIsInitialization
   */
  setIsInitialized: (isInitialized: boolean) => void;

}

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>(DEFAULT_GLOBAL_CONTEXT);

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);

