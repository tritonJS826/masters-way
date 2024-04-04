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
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#F2EFF9",
    // [Theme.DARK]: "rgb(39,36,36)",
    // [Theme.LIGHT]: "rgb(233, 234, 242)",
  },
  // Contrast to body
  secondaryBackgroundColor: {
    [Theme.DARK]: "#4E427F",
    [Theme.LIGHT]: "#FCFBFE",
    // [Theme.DARK]: "rgb(241,243,242)",
    // [Theme.LIGHT]: "rgb(46,48,62)",
  },
  // Similar to body (highgligh blocks)
  tertiaryBackgroundColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(88,90,86)",
    // [Theme.LIGHT]: "rgba(211, 214, 229, 0.8)",
  },
  // Sidebar
  quaternaryBackgroundColor: {
    [Theme.DARK]: "#0B0322",
    [Theme.LIGHT]: "#0B0322",
  },
  // Input, select
  backgroundElementColor: {
    [Theme.DARK]: "#3D3462",
    [Theme.LIGHT]: "#F9F6FF",
  },
  primaryTextColor: {
    [Theme.DARK]: "#FCFBFE",
    [Theme.LIGHT]: "#1F173D",
    // [Theme.DARK]: "rgb(250, 250, 250)",
    // [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  secondaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#FFFFFF",
    // [Theme.DARK]: "rgb(11, 9, 10)",
    // [Theme.LIGHT]: "rgb(252, 252, 252)",
  },
  tertiaryTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#1F173D",
  },
  primaryBorderColor: {
    [Theme.DARK]: "#FFFFFF",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(200, 194, 194)",
    // [Theme.LIGHT]: "rgb(73, 69, 69)",
  },
  primaryIconColor: {
    [Theme.DARK]: "#FAFAFA",
    [Theme.LIGHT]: "#0B090A",
    // [Theme.DARK]: "rgb(250, 250, 250)",
    // [Theme.LIGHT]: "rgb(11, 9, 10)",
  },
  favoriteIconColor: {
    [Theme.DARK]: "#FAFF0B",
    [Theme.LIGHT]: "#FAFF0B",
  },

  primaryShadowColor: {
    [Theme.DARK]: "#rgb(22, 26, 29)",
    [Theme.LIGHT]: "#rgb(225, 222, 222)",
  },
  // PrimaryHoverButtonColor
  hoverColor: {
    [Theme.DARK]: "#603EBB",
    [Theme.LIGHT]: "#603EBB",
    // [Theme.DARK]: "rgb(152, 210, 235)",
    // [Theme.LIGHT]: "rgb(84,103,143)",
  },
  // ProgressBar
  activeColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(129,163,167)",
    // [Theme.LIGHT]: "rgb(84,103,143)",
  },
  linkColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(152, 210, 235)",
    // [Theme.LIGHT]: "rgb(8, 65, 185)",
  },
  activeColorLink: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(22, 26, 29)",
    // [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  primaryActiveButtonColor: {
    [Theme.DARK]: "#482E8C",
    [Theme.LIGHT]: "#482E8C",
    // [Theme.DARK]: "rgb(108,107,116)",
    // [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  secondaryHoverButtonColor: {
    [Theme.DARK]: "#1F173D",
    [Theme.LIGHT]: "#F2EFF9",
    // [Theme.DARK]: "rgb(108,107,116)",
    // [Theme.LIGHT]: "rgb(200, 194, 194)",
  },
  primaryDisabledButtonColor: {
    [Theme.DARK]: "#56468F",
    [Theme.LIGHT]: "#BFB7FB",
  },
  primaryBackgroundButtonColor: {
    [Theme.DARK]: "#784DEA",
    [Theme.LIGHT]: "#784DEA",
    // [Theme.DARK]: "rgb(129,163,167)",
    // [Theme.LIGHT]: "rgb(33,38,36)",
  },
  secondaryBackgroundButtonColor: {
    [Theme.DARK]: "transparent",
    [Theme.LIGHT]: "transparent",
  },
  authButtonTextColor: {
    [Theme.DARK]: "#F4F3FF",
    [Theme.LIGHT]: "#F4F3FF",
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
