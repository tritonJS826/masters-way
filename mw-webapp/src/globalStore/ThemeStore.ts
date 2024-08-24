import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
  OBSIDIAN = "obsidian",
}

// To add opacity use converter https://www.rapidtables.com/convert/number
const themedVariables: Record<string, Record<Theme, string>> = {
  generalPrimaryColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    [Theme.OBSIDIAN]: "#784DEA",
  },
  primaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  secondaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
  },
  // Body color
  primaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#F2EFF9",
    [Theme.OBSIDIAN]: "#121212",
  },
  secondaryBgColor: {
    [Theme.DARK]: "#3D3462",
    [Theme.LIGHT]: "#FCFBFE",
    [Theme.OBSIDIAN]: "#202020",
  },
  tertiaryBgColor: {
    [Theme.DARK]: "#686085",
    [Theme.LIGHT]: "#F2EFF9",
    [Theme.OBSIDIAN]: "#2e2e2e",
  },
  hoverBgColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
  },
  // Sidebar and footer and shadow for notebook (homePage)
  quaternaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#281E51",
    [Theme.OBSIDIAN]: "#121212",
  },
  overlayBgColor: {
    [Theme.DARK]: "#00000080",
    [Theme.LIGHT]: "#00000080",
    [Theme.OBSIDIAN]: "#00000080",
  },
  progressBarBgColor: {
    [Theme.DARK]: "#8F8F8F",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
  },
  additionalInfoCardBgColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#FCFBFE",
    [Theme.OBSIDIAN]: "#2e2e2e",
  },
  // Icon circle background
  secondaryIconBgColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  primaryIconColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  secondaryIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
    [Theme.OBSIDIAN]: "#A8A1DD",
  },
  tertiaryIconColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#1F173D",
  },
  hoverIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#8B85A1",
    [Theme.OBSIDIAN]: "#A8A1DD",
  },
  bookmarksIconColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
    [Theme.OBSIDIAN]: "#3AEC88",
  },
  primaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  secondaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  secondaryBgBtnColor: {
    [Theme.DARK]: "transparent",
    [Theme.LIGHT]: "transparent",
    [Theme.OBSIDIAN]: "#transparent",
  },
  primaryBgBtnHoverColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
    [Theme.OBSIDIAN]: "#603EBB",
  },
  primaryBgBtnActiveColor: {
    [Theme.DARK]: "#482E8C",
    [Theme.LIGHT]: "#482E8C",
    [Theme.OBSIDIAN]: "#482E8C",
  },
  primaryToggleBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#686085",
    [Theme.OBSIDIAN]: "#281E51",
  },
  secondaryToggleBgColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#F4F3FF",
  },
  dropdownStrokeColor: {
    [Theme.DARK]: "#8B85A1",
    [Theme.LIGHT]: "#F4F3FF",
    [Theme.OBSIDIAN]: "#8B85A1",
  },
  activeColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
    [Theme.OBSIDIAN]: "#3AEC88",

  },
  attentionColor: {
    [Theme.DARK]: "#79AF8E",
    [Theme.LIGHT]: "#79AF8E",
    [Theme.OBSIDIAN]: "#79AF8E",

  },
  dangerColor: {
    [Theme.DARK]: "#F18E8E",
    [Theme.LIGHT]: "#F18E8E",
    [Theme.OBSIDIAN]: "#F18E8E",
  },
  favoriteActiveIconColor: {
    [Theme.DARK]: "#FAFF0B",
    [Theme.LIGHT]: "#FAFF0B",
    [Theme.OBSIDIAN]: "#FAFF0B",
  },
  mainInfoCardColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    [Theme.OBSIDIAN]: "#4a4a4a",
  },
  wayCollectionCardActiveColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
    [Theme.OBSIDIAN]: "#784DEA",
  },
};

export const DEFAULT_THEME = Theme.DARK;

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
   */
  public setTheme = (theme: Theme) => {
    Object.entries(themedVariables).forEach(([variableName, variableValue]) => {
      document.documentElement.style.setProperty(`--${variableName}`, variableValue[theme]);
    });
    localStorageWorker.setItemByKey("theme", theme);

    this.theme = theme;
  };

  /**
   * Load theme
   */
  public loadTheme = () => {
    const theme = localStorageWorker.getItemByKey<Theme>("theme");
    this.setTheme(theme ?? DEFAULT_THEME);
  };

}

export const themeStore = new ThemeStore();

export {themedVariables};
