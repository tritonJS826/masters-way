import {localStorageWorker} from "src/utils/LocalStorageWorker";

/**
 * Available themes
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light"
}

const themedVariables: Record<string, Record<Theme, string>> = {
  // Body color
  primaryBackgroundColor: {
    [Theme.DARK]: "rgb(39,36,36)",
    [Theme.LIGHT]: "rgb(233, 234, 242)",
  },
  // Contrast to body
  secondaryBackgroundColor: {
    [Theme.DARK]: "rgb(241,243,242)",
    [Theme.LIGHT]: "rgb(46,48,62)",
  },
  // Similar to body (highgligh blocks)
  tertiaryBackgroundColor: {
    [Theme.DARK]: "rgb(88,90,86)",
    [Theme.LIGHT]: "rgba(211, 214, 229, 0.8)",
  },
  primaryTextColor: {
    [Theme.DARK]: "rgb(250, 250, 250)",
    [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  secondaryTextColor: {
    [Theme.DARK]: "rgb(11, 9, 10)",
    [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  primaryBorderColor: {
    [Theme.DARK]: "rgb(200, 194, 194)",
    [Theme.LIGHT]: "rgb(73, 69, 69)",
  },
  primaryIconColor: {
    [Theme.DARK]: "rgb(250, 250, 250)",
    [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  primaryShadowColor: {
    [Theme.DARK]: "rgb(22, 26, 29)",
    [Theme.LIGHT]: "rgb(225, 222, 222)",
  },
  hoverColor: {
    [Theme.DARK]: "rgb(152, 210, 235)",
    [Theme.LIGHT]: "rgb(84,103,143)",
  },
  activeColor: {
    [Theme.DARK]: "rgb(129,163,167)",
    [Theme.LIGHT]: "rgb(84,103,143)",
  },
  linkColor: {
    [Theme.DARK]: "rgb(152, 210, 235)",
    [Theme.LIGHT]: "rgb(8, 65, 185)",
  },
  activeColorLink: {
    [Theme.DARK]: "rgb(22, 26, 29)",
    [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  primaryActiveButtonColor: {
    [Theme.DARK]: "rgb(108,107,116)",
    [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  primaryBackgroundButtonColor: {
    [Theme.DARK]: "rgb(129,163,167)",
    [Theme.LIGHT]: "rgb(33,38,36)",
  },
  secondaryBackgroundButtonColor: {
    [Theme.DARK]: "transparent",
    [Theme.LIGHT]: "transparent",
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
