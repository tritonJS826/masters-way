import clsx from "clsx";
import {Icon, IconSize} from "src/component/icon/Icon";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {Language} from "src/globalStore/LanguageStore";
import {Theme} from "src/globalStore/ThemeStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/themeSwitcher/ThemeSwitcher.module.scss";

/**
 * Calculate next switch theme
 */
export const getNextSwitchTheme = (theme: Theme) => {
  return theme === Theme.DARK ? Theme.LIGHT : Theme.DARK;
};

/**
 * Get description for the them
 */
const getDescriptionForTheme = (theme: Theme, language: Language): string =>
  LanguageService.header.themeTooltip[getNextSwitchTheme(theme)][language];

/**
 * Get icon for theme
 */
const getIconForNextTheme = (theme: Theme) => theme === Theme.DARK ? "SunIcon" : "MoonIcon";

/**
 * ThemeSwitcher props
 */
interface ThemeSwitcherProps {

  /**
   * Custom class name
   */
  className?: string;

  /**
   * Theme value
   */
  theme: Theme;

  /**
   * Click handler
   */
  onClick: (theme: Theme) => void;

  /**
   * Language value
   */
  language: Language;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * ThemeSwitcher component
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {

  /**
   *Change theme
   */
  const onChangeTheme = () => {
    const updatedTheme = getNextSwitchTheme(props.theme);
    props.onClick(updatedTheme);
  };

  return (
    <Tooltip
      position={PositionTooltip.BOTTOM}
      content={getDescriptionForTheme(props.theme, props.language)}
    >
      <button
        className={clsx(styles.iconWrapper, props.className)}
        onClick={onChangeTheme}
        data-cy={props.dataCy}
      >
        <Icon
          size={IconSize.MEDIUM}
          name={getIconForNextTheme(props.theme)}
        />
      </button>
    </Tooltip>
  );
};
