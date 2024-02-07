import {useState} from "react";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";
import styles from "src/logic/themeSwitcher/ThemeSwitcher.module.scss";

/**
 * ThemeSwitcher component
 */
export const ThemeSwitcher = () => {
  const initialTheme = ThemeWorker.getCurrentTheme();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  /**
   * GetSwitchTheme
   */
  const getSwitchTheme = (switchTheme: Theme) => {
    return switchTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  };

  /**
   *Change theme
   */
  const onChangeTheme = () => {
    setTheme((prevTheme) => {
      const currentTheme = getSwitchTheme(prevTheme);
      ThemeWorker.setTheme(currentTheme);

      return currentTheme;
    });
  };

  return (
    <Tooltip
      position={PositionTooltip.BOTTOM}
      content={`Switch to ${getSwitchTheme(theme)} theme`}
    >
      <button
        className={styles.iconWrapper}
        onClick={onChangeTheme}
      >
        <Icon
          size={IconSize.MEDIUM}
          name={theme === Theme.DARK ? "MoonIcon" : "SunIcon"}
        />
      </button>
    </Tooltip>
  );
};
