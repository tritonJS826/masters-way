import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}

const themedVariables: Record<string, Record<Theme, string>> = {
  primaryBackgroundColor: {
    [Theme.DARK]: "rgb(11, 9, 10)",
    [Theme.LIGHT]: "rgb(245, 243, 244)",
  },
  secondaryBackgroundColor: {
    [Theme.DARK]: "rgb(177, 167, 166)",
    [Theme.LIGHT]: "rgb(38, 41, 44)",
  },
  tertiaryBackgroundColor: {
    [Theme.DARK]: "rgb(186, 24, 27)",
    [Theme.LIGHT]: "rgb(186, 24, 27)",
  },
  fourthBackgroundColor: {
    [Theme.DARK]: "rgb(64,64,64)",
    [Theme.LIGHT]: "rgb(64,64,64)",
  },
  fifthBackgroundColor: {
    [Theme.DARK]: "rgb(252, 252, 252)",
    [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  primaryTextColor: {
    [Theme.DARK]: "rgb(200, 194, 194)",
    [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  secondaryTextColor: {
    [Theme.DARK]: "rgb(11, 9, 10)",
    [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "rgb(236, 165, 100)",
    [Theme.LIGHT]: "rgb(102, 7, 8)",
  },
  fourthTextColor: {
    [Theme.DARK]: "rgb(252, 252, 252)",
    [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  fifthTextColor: {
    [Theme.DARK]: "rgb(200, 194, 194)",
    [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  sixTextColor: {
    [Theme.DARK]: "rgb(11, 9, 10)",
    [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  primaryBorderColor: {
    [Theme.DARK]: "rgb(73, 69, 69)",
    [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  secondaryBorderColor: {
    [Theme.DARK]: "rgb(73, 69, 69)",
    [Theme.LIGHT]: "rgb(102, 7, 8)",
  },
  primaryIconColor: {
    [Theme.DARK]: "rgb(200, 194, 194)",
    [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  primaryShadowColor: {
    [Theme.DARK]: "rgb(22, 26, 29)",
    [Theme.LIGHT]: "rgb(225, 222, 222)",
  },
  hoverColor: {
    [Theme.DARK]: "rgb(229, 56, 59)",
    [Theme.LIGHT]: "rgb(229, 56, 59)",
  },
  secondaryHoverColor: {
    [Theme.DARK]: "rgb(229, 56, 59)",
    [Theme.LIGHT]: "rgb(225, 222, 222)",
  },
  hoverColorLink: {
    [Theme.DARK]: "rgb(38, 41, 44)",
    [Theme.LIGHT]: "rgb(225, 222, 222)",
  },
  activeColor: {
    [Theme.DARK]: "rgb(164, 22, 26)",
    [Theme.LIGHT]: "rgb(164, 22, 26)",
  },
  secondaryActiveColor: {
    [Theme.DARK]: "rgb(164, 22, 26)",
    [Theme.LIGHT]: "rgb(164, 22, 26)",
  },
  activeColorLink: {
    [Theme.DARK]: "rgb(22, 26, 29)",
    [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  buttonColor: {
    [Theme.DARK]: "rgb(102, 7, 8)",
    [Theme.LIGHT]: "transparent",
  },
  border: {
    [Theme.DARK]: "none",
    [Theme.LIGHT]: "1px var(--secondaryBorderColor) solid",
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
    return localStorageWorker.getItemByKey<Theme>("theme") ?? DEFAULT_THEME;
  }

}
