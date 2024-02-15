import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Default setUser's value
 */
const DEFAULT_SET_USER = () => {
  throw Error("The user context is not initialized properly");
};

/**
 * Default setIsInitialization
 */
const DEFAULT_SET_INITIALIZATION = () => {
  throw Error("The app is not initialization");
};

export const DEFAULT_NOTIFICATION_SETTINGS: Notification = {
  isEnabled: true,
  // TODO: make it way-specific
  notificationTime: "21:00",
};

const DEFAULT_GLOBAL_CONTEXT = {
  user: null,
  setUser: DEFAULT_SET_USER,
  isInitialization: true,
  setIsInitialization: DEFAULT_SET_INITIALIZATION,
  notification: DEFAULT_NOTIFICATION_SETTINGS,
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
   * If user is not logged - null, if logged - UserPreview always
   */
  user: UserPreview | null;

  /**
   * Update user
   */
  setUser: (user: UserPreview | null) => void;

  /**
   * isInitialization
   */
  isInitialization: boolean;

  /**
   * setIsInitialization
   */
  setIsInitialization: (isInitialization: boolean) => void;

  /**
   * Notification related settings
   */
  notification: Notification;

}

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>(DEFAULT_GLOBAL_CONTEXT);

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);
