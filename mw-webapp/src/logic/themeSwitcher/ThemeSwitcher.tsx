import {useState} from "react";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";
import styles from "src/logic/themeSwitcher/ThemeSwitche.module.scss";

/**
 * ThemeSwitcher component
 */
export const ThemeSwitcher = () => {
  const currentTheme = ThemeWorker.getCurrentTheme();
  const [theme, setTheme] = useState<Theme>(currentTheme);

  /**
   *Change theme
   */
  const onChangeTheme = () => {
    setTheme((prevTheme) => {
      const curTheme = prevTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
      ThemeWorker.setTheme(currentTheme);

      return curTheme;
    });
  };

  return (
    <button
      className={styles.iconWrapper}
      onClick={onChangeTheme}
    >
      {theme === Theme.DARK
        ? (
          <Icon
            size={IconSize.MEDIUM}
            name="MoonIcon"
          />
        )
        : (
          <Icon
            size={IconSize.MEDIUM}
            name="SunIcon"
          />
        )}
    </button>
  );
};
