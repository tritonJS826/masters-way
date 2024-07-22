import {makeAutoObservable} from "mobx";
import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}

// To add opacity use converter https://www.rapidtables.com/convert/number
const themedVariables: Record<string, Record<Theme, string>> = {
  generalPrimaryColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
  },
  primaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
  },
  secondaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
  },
  // Body color
  primaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#F2EFF9",
  },
  secondaryBgColor: {
    [Theme.DARK]: "#3D3462",
    [Theme.LIGHT]: "#FCFBFE",
  },
  tertiaryBgColor: {
    [Theme.DARK]: "#686085",
    [Theme.LIGHT]: "#F2EFF9",
  },
  hoverBgColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
  },
  // Sidebar and footer and shadow for notebook (homePage)
  quaternaryBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#281E51",
  },
  overlayBgColor: {
    [Theme.DARK]: "#00000080",
    [Theme.LIGHT]: "#00000080",
  },
  progressBarBgColor: {
    [Theme.DARK]: "#8F8F8F",
    [Theme.LIGHT]: "#A8A1DD",
  },
  additionalInfoCardBgColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#FCFBFE",
  },
  // Icon circle background
  secondaryIconBgColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
  },
  primaryIconColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
  },
  secondaryIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#A8A1DD",
  },
  tertiaryIconColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#1F173D",
  },
  hoverIconColor: {
    [Theme.DARK]: "#A8A1DD",
    [Theme.LIGHT]: "#8B85A1",
  },
  bookmarksIconColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
  },
  primaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
  },
  secondaryStrokeColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
  },
  secondaryBgBtnColor: {
    [Theme.DARK]: "transparent",
    [Theme.LIGHT]: "transparent",
  },
  primaryBgBtnHoverColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
  },
  primaryBgBtnActiveColor: {
    [Theme.DARK]: "#482E8C",
    [Theme.LIGHT]: "#482E8C",
  },
  homeBgButtonColor: {
    [Theme.DARK]: "#FCFBFE",
    [Theme.LIGHT]: "#FCFBFE",
  },
  homeHoverBgButtonColor: {
    [Theme.DARK]: "#F2EFF9",
    [Theme.LIGHT]: "#F2EFF9",
  },
  // Doesn't exist on maket, but maybe we will use border with opacity fo statistic separate
  primaryBorderSeparator: {
    [Theme.DARK]: "#FFFFFF3E",
    [Theme.LIGHT]: "#784DEA3E",
  },
  primaryToggleBgColor: {
    [Theme.DARK]: "#281E51",
    [Theme.LIGHT]: "#686085",
  },
  secondaryToggleBgColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#F4F3FF",
  },
  dropdownStrokeColor: {
    [Theme.DARK]: "#8B85A1",
    [Theme.LIGHT]: "#F4F3FF",
  },
  activeColor: {
    [Theme.DARK]: "#3AEC88",
    [Theme.LIGHT]: "#3AEC88",
  },
  attentionColor: {
    [Theme.DARK]: "#79AF8E",
    [Theme.LIGHT]: "#79AF8E",
  },
  dangerColor: {
    [Theme.DARK]: "#F18E8E",
    [Theme.LIGHT]: "#F18E8E",
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
