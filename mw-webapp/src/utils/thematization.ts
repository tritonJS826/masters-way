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
    [Theme.LIGHT]: "rgb(202, 200, 200)",
  },
};

/**
 * Set site theme
 */
export const setTheme = (theme: Theme) => {
  Object.entries(themedVariables).forEach(([variableName, variableValue]) => {
    document.documentElement.style.setProperty(`--${variableName}`, variableValue[theme]);
  });
};
