import {createContext, useContext} from "react";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {DEFAULT_LANGUAGE, Language} from "src/utils/LanguageWorker";
import {DEFAULT_THEME, Theme} from "src/utils/ThemeWorker";

/**
 * Default stub setUser's value
 */
const DEFAULT_SET_USER = () => {
  throw Error("The user context is not initialized properly");
};

/**
 * Default stub setIsInitialization
 */
const DEFAULT_SET_INITIALIZED = () => {
  throw Error("This is stub function for the initialization. This function should not be called");
};

/**
 * Default stub efault setTheme's value
 */
const DEFAULT_SET_THEME = () => {
  throw Error("The theme context is not initialized properly");
};

/**
 * Default stub set language
 */
const DEFAULT_SET_LANGUAGE = () => {
  throw Error("The language context is not initialized properly");
};

export const DEFAULT_NOTIFICATION_SETTINGS: Notification = {
  isEnabled: true,
  // TODO: make it way-specific
  notificationTime: "21:00",
};

const DEFAULT_GLOBAL_CONTEXT = {
  user: null,
  setUser: DEFAULT_SET_USER,
  isInitialized: false,
  setIsInitialized: DEFAULT_SET_INITIALIZED,
  notification: DEFAULT_NOTIFICATION_SETTINGS,
  theme: DEFAULT_THEME,
  setTheme: DEFAULT_SET_THEME,
  language: DEFAULT_LANGUAGE,
  setLanguage: DEFAULT_SET_LANGUAGE,
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
   * IsInitialization
   */
  isInitialized: boolean;

  /**
   * SetIsInitialization
   */
  setIsInitialized: (isInitialized: boolean) => void;

  /**
   * Notification related settings
   */
  notification: Notification;

  /**
   * Theme
   */
  theme: Theme;

  /**
   * Set theme
   */
  setTheme: (theme: Theme) => void;

  /**
   * Interface language
   */
  language: Language;

  /**
   * Set language
   */
  setLanguage: (language: Language) => void;

}

export const globalContext: React.Context<GlobalContext> = createContext<GlobalContext>(DEFAULT_GLOBAL_CONTEXT);

/**
 * Use UserContext
 */
export const useGlobalContext = () => useContext(globalContext);

