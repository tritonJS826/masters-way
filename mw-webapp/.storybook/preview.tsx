import React from "react";
import type {Preview} from "@storybook/react";
import { ThemeSwitcher, getNextSwitchTheme } from "../src/component/themeSwitcher/ThemeSwitcher";
import {globalContext} from "../src/GlobalContext";
import {languageStore} from "../src/globalStore/LanguageStore";
import {themeStore} from "../src/globalStore/ThemeStore";

import './preview.scss';


export const ThemeComponent = () => {
  const {theme, setTheme} = themeStore;
  const {language} = languageStore;

  return (
    <globalContext.Provider value={{
      isInitialized: true,
      setIsInitialized: () => {},
    }}
    >
      <ThemeSwitcher language={language} theme={theme} onClick={() => setTheme(getNextSwitchTheme(themeStore.theme))} />
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
