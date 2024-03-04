import {Icon, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {useGlobalContext} from "src/GlobalContext";
import {Theme} from "src/utils/ThemeWorker";
import styles from "src/logic/themeSwitcher/ThemeSwitcher.module.scss";

/**
 * ThemeSwitcher component
 */
export const ThemeSwitcher = () => {
  const {theme, setTheme} = useGlobalContext();

  /**
   * GetSwitchTheme
   */
  const getNextSwitchTheme = (switchTheme: Theme) => {
    return switchTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
  };

  /**
   *Change theme
   */
  const onChangeTheme = () => {
    const updatedTheme = getNextSwitchTheme(theme);
    setTheme(updatedTheme);
  };

  return (
    <Tooltip
      position={PositionTooltip.BOTTOM}
      content={`Switch to ${getNextSwitchTheme(theme)} theme`}
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
