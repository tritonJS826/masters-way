import React, { useEffect } from "react";
import type {Preview} from "@storybook/react";
import {ThemeSwitcher} from "../src/logic/themeSwitcher/ThemeSwitcher";

import {useState} from "react";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "../src/GlobalContext";
import {Language, LanguageWorker} from "../src/utils/LanguageWorker";
import {Theme, ThemeWorker} from "../src/utils/ThemeWorker";

import './preview.scss';


export const ThemeComponent = () => {
  const [theme, setThemeState] = useState(ThemeWorker.getCurrentTheme());
  const [language, setLanguageState] = useState(LanguageWorker.getCurrentLanguage());

  useEffect(() => { 
    ThemeWorker.loadTheme();
  },[]);

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
      user: 'user',
      setUser: () => {},
      isInitialized: true,
      setIsInitialized: () => {},
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
      theme,
      setTheme,
      language,
      setLanguage,
    }}
    >
      <ThemeSwitcher />
    </globalContext.Provider>
  );
};



const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story, context) => {
      if (context.viewMode === "story") {
        console.log('ss')
        return (
          <>
            <div style={{ position: "absolute", top: "20px", left: "20px" }}>
            <ThemeComponent />
            </div>
            <Story />
          </>
        );
      } else {
        return <Story />;
      }
    },
  ]
};

export default preview;
