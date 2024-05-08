import React, { useEffect } from "react";
import type {Preview} from "@storybook/react";
import { ThemeSwitcher } from "../src/component/themeSwitcher/ThemeSwitcher";
import {useState} from "react";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "../src/GlobalContext";
import {Language, LanguageWorker} from "../src/utils/LanguageWorker";
import {themeStore} from "../src/globalStore/ThemeStore";

import './preview.scss';


export const ThemeComponent = () => {
  const {theme, setTheme} = themeStore;
  const [language, setLanguageState] = useState(LanguageWorker.getCurrentLanguage());

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
      language,
      setLanguage,
    }}
    >
      <ThemeSwitcher language={language} theme={theme} setTheme={setTheme} />
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
