import {localStorageWorker} from "src/utils/LocalStorage";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}

const themedVariables: Record<string, Record<Theme, string>> = {
  primaryBackgroundColor: {
    [Theme.DARK]: "rgb(20, 20, 20)",
    [Theme.LIGHT]: "rgb(200, 200, 200)",
  },
  secondaryBackgroundColor: {
    [Theme.DARK]: "rgb(200, 200, 200)",
    [Theme.LIGHT]: "rgb(20, 20, 20)",
  },
  tertiaryBackgroundColor: {
    [Theme.DARK]: "rgb(200, 30, 30)",
    [Theme.LIGHT]: "rgb(50, 30, 200)",
  },
  primaryTextColor: {
    [Theme.DARK]: "rgb(200, 200, 200)",
    [Theme.LIGHT]: "rgb(20, 20, 20)",
  },
  secondaryTextColor: {
    [Theme.DARK]: "rgb(20, 20, 20)",
    [Theme.LIGHT]: "rgb(200, 200, 200)",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "rgb(200, 30, 30)",
    [Theme.LIGHT]: "rgb(50, 30, 200)",
  },
  primaryBorderColor: {
    [Theme.DARK]: "rgb(255, 255, 255)",
    [Theme.LIGHT]: "rgb(20, 20, 20)",
  },
  primaryShadowColor: {
    [Theme.DARK]: "rgb(215, 215, 215)",
    [Theme.LIGHT]: "rgb(100, 100, 100)",
  },
  hoverColor: {
    [Theme.DARK]: "rgb(135, 135, 135)",
    [Theme.LIGHT]: "rgb(135, 135, 135)",
  },
  activeColor: {
    [Theme.DARK]: "rgb(45, 44, 44)",
    [Theme.LIGHT]: "rgb(45, 44, 44)",
  },
};

export const DEFAULT_THEME = Theme.DARK;

/**
 * All theme-related methods
 */
export class ThemeWorker {

  /**
   * Set theme
   */
  public static setTheme(theme: Theme) {
    Object.entries(themedVariables).forEach(([variableName, variableValue]) => {
      document.documentElement.style.setProperty(`--${variableName}`, variableValue[theme]);
    });
    localStorageWorker.setItemByKey("theme", theme);
  }

  /**
   * Load theme
   */
  public static loadTheme() {
    const theme = localStorageWorker.getItemByKey<Theme>("theme");
    this.setTheme(theme ?? DEFAULT_THEME);
  }

  /**
   * Get current theme
   */
  public static getCurrentTheme() {
    return localStorageWorker.getItemByKey("theme") ?? DEFAULT_THEME;
  }

}
