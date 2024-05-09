import React, { useEffect } from "react";
import type {Preview} from "@storybook/react";
import { ThemeSwitcher } from "../src/component/themeSwitcher/ThemeSwitcher";
import {useState} from "react";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  globalContext,
} from "../src/GlobalContext";
import {Language, languageStore} from "../src/globalStore/LanguageStore";
import {themeStore} from "../src/globalStore/ThemeStore";

import './preview.scss';


export const ThemeComponent = () => {
  const {theme, setTheme} = themeStore;
  const {language} = languageStore;

  return (
    <globalContext.Provider value={{
      user: 'user',
      setUser: () => {},
      isInitialized: true,
      setIsInitialized: () => {},
      // TODO: load from local storage
      notification: DEFAULT_NOTIFICATION_SETTINGS,
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
