import {useState} from "react";
import {RouterProvider} from "react-router-dom";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "src/GlobalContext";
import {User} from "src/model/businessModel/User";
import {router} from "src/router/Router";
import {Language, LanguageWorker} from "src/utils/LanguageWorker";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";

/**
 * App
 */
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [theme, setThemeState] = useState(ThemeWorker.getCurrentTheme());
  const [language, setLanguageState] = useState(LanguageWorker.getCurrentLanguage());

  /**
   * Set theme in context and local storage
   */
  const setTheme = (updatedTheme: Theme) => {
    setThemeState(updatedTheme);
    ThemeWorker.setTheme(updatedTheme);
  };

  /**
   * Set language in context and local storage
   */
  const setLanguage = (updatedLanguage: Language) => {
    setLanguageState(updatedLanguage);
    LanguageWorker.setLanguage(updatedLanguage);
  };

  return (
    <globalContext.Provider value={{
      user,
      setUser,
      isInitialized,
      setIsInitialized,
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
      theme,
      setTheme,
      language,
      setLanguage,
    }}
    >
      <RouterProvider router={router} />
    </globalContext.Provider>
  );
};
