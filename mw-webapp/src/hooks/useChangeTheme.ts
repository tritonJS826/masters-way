import {useState} from "react";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";

/**
 *Custom hook to change theme
 */
export const useChangeTheme = () => {
  const currentTheme = ThemeWorker.getCurrentTheme();
  const [theme, setTheme] = useState(currentTheme);

  /**
   *OnChangeTheme
   */
  const onChangeTheme = (value: string) => {
    ThemeWorker.setTheme(value as Theme);
    setTheme(value as Theme);
  };

  return {theme, onChangeTheme};
};
