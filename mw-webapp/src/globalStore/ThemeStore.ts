import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
  OBSIDIAN = "obsidian",
  NEW = "new",
}

// To add opacity use converter https://www.rapidtables.com/convert/number
const themedVariables: Record<string, Record<Theme, string>> = {
  generalPrimaryColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    [Theme.OBSIDIAN]: "#784DEA",
    [Theme.NEW]: "#5243F1",
  },
  primaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#000000",
  },
  secondaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#FFFFFF",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
    [Theme.NEW]: "#b4b4bc",
  },
  // Body color
  primaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#F2EFF9",
    [Theme.OBSIDIAN]: "#121212",
    [Theme.NEW]: "#F2F5FF",
  },
  secondaryBgColor: {
    [Theme.DARK]: "#3D3462",
    [Theme.LIGHT]: "#FCFBFE",
    [Theme.OBSIDIAN]: "#202020",
    [Theme.NEW]: "#FFFFFF",
  },
  tertiaryBgColor: {
    [Theme.DARK]: "#686085",
    [Theme.LIGHT]: "#F2EFF9",
    [Theme.OBSIDIAN]: "#2e2e2e",
    [Theme.NEW]: "#8269FF",
  },
  hoverBgColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
    [Theme.NEW]: "#8377FF",
  },
  // Sidebar and footer and shadow for notebook (homePage)
  quaternaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#281E51",
    [Theme.OBSIDIAN]: "#121212",
    [Theme.NEW]: "#23197b",
  },
  overlayBgColor: {
    [Theme.DARK]: "#00000080",
    [Theme.LIGHT]: "#00000080",
    [Theme.OBSIDIAN]: "#20202099",
    [Theme.NEW]: "#20202099",
  },
  // Used for possibility to use transparent image with backgroundColor
  opacityBgColor: {
    [Theme.DARK]: "#3D346250",
    [Theme.LIGHT]: "#FCFBFE50",
    [Theme.OBSIDIAN]: "#20202099",
    [Theme.NEW]: "#FCFBFE50",
  },
  progressBarBgColor: {
    [Theme.DARK]: "#8F8F8F",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
    [Theme.NEW]: "#E5E9FA",
  },
  loaderLineBgColor: {
    [Theme.DARK]: "#337ab726",
    [Theme.LIGHT]: "#337ab726",
    [Theme.OBSIDIAN]: "#337ab726",
    [Theme.NEW]: "#E5E9FA",
  },
  additionalInfoCardBgColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#FCFBFE",
    [Theme.OBSIDIAN]: "#2e2e2e",
    [Theme.NEW]: "#FFFFFF",
  },
  // Icon circle background
  secondaryIconBgColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#FFFFFF",
  },
  primaryIconColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#000000",
  },
  secondaryIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
    [Theme.NEW]: "#FFFFFF",
  },
  tertiaryIconColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#1F173D",
    [Theme.NEW]: "#000000",
  },
  hoverIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#8B85A1",
    [Theme.OBSIDIAN]: "#A8A1DD",
    [Theme.NEW]: "#A8A1DD",
  },
  bookmarksIconColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
    [Theme.OBSIDIAN]: "#3AEC88",
    [Theme.NEW]: "#5FE5D3",
  },
  primaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#000000",
  },
  secondaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#BEBEBE",
  },
  secondaryBgBtnColor: {
    [Theme.DARK]: "transparent",
    [Theme.LIGHT]: "transparent",
    [Theme.OBSIDIAN]: "#transparent",
    [Theme.NEW]: "#transparent",
  },
  primaryBgBtnHoverColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
    [Theme.OBSIDIAN]: "#603EBB",
    [Theme.NEW]: "#3B2EC7",
  },
  primaryBgBtnActiveColor: {
    [Theme.DARK]: "#482E8C",
    [Theme.LIGHT]: "#482E8C",
    [Theme.OBSIDIAN]: "#482E8C",
    [Theme.NEW]: "#482E8C",
  },
  primaryToggleBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#686085",
    [Theme.OBSIDIAN]: "#281E51",
    [Theme.NEW]: "#BAB8D0",
  },
  secondaryToggleBgColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
    [Theme.NEW]: "#FFFFFF",
  },
  dropdownStrokeColor: {
    [Theme.DARK]: "#8B85A1",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#8B85A1",
    [Theme.NEW]: "#FFFFFF",
  },
  activeColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
    [Theme.OBSIDIAN]: "#3AEC88",
    [Theme.NEW]: "#3AEC88",

  },
  attentionColor: {
    [Theme.DARK]: "#79AF8E",
    [Theme.LIGHT]: "#79AF8E",
    [Theme.OBSIDIAN]: "#79AF8E",
    [Theme.NEW]: "#79AF8E",
  },
  dangerColor: {
    [Theme.DARK]: "#F18E8E",
    [Theme.LIGHT]: "#F18E8E",
    [Theme.OBSIDIAN]: "#F18E8E",
    [Theme.NEW]: "#F18E8E",
  },
  favoriteActiveIconColor: {
    [Theme.DARK]: "#FAFF0B",
    [Theme.LIGHT]: "#FAFF0B",
    [Theme.OBSIDIAN]: "#FAFF0B",
    [Theme.NEW]: "#FFF30B",
  },
  mainInfoCardColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    [Theme.OBSIDIAN]: "#4a4a4a",
    [Theme.NEW]: "#5243F1",
  },
  collectionCardActiveColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
    [Theme.OBSIDIAN]: "#784DEA",
    [Theme.NEW]: "#5FE5D3",
  },
};

export const DEFAULT_THEME = Theme.LIGHT;

/**
 * All theme-related methods
 * Works with localStorage
 */
class ThemeStore {

  /**
   * Theme value
   * @default DEFAULT_THEME
   */
  public theme: Theme = DEFAULT_THEME;

  constructor() {
    makeAutoObservable(this);
    this.loadTheme();
  }

  /**
   * Set theme
   * Falls back to DEFAULT_THEME if invalid theme is provided
   */
  public setTheme = (theme: Theme) => {
    const validatedTheme = this.validateTheme(theme) ? theme : DEFAULT_THEME;
    Object.entries(themedVariables).forEach(([variableName, variableValue]) => {
      document.documentElement.style.setProperty(`--${variableName}`, variableValue[validatedTheme]);
    });
    localStorageWorker.setItemByKey("theme", validatedTheme);
    this.theme = validatedTheme;
  };

  /**
   * Load theme
   */
  public loadTheme = () => {
    const theme = localStorageWorker.getItemByKey<Theme>("theme");
    this.setTheme(theme ?? DEFAULT_THEME);
  };

  /**
   * Validate theme
   */
  public validateTheme = (theme: Theme) => {
    return Object.values(Theme).includes(theme);
  };

}

export const themeStore = new ThemeStore();

export {themedVariables};
