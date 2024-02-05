import {OptionType} from "src/component/select/option/Option";
import {Select} from "src/component/select/Select";
import {Theme, ThemeWorker} from "src/utils/ThemeWorker";

/**
 * ThemeSwitcher component
 */
export const ThemeSwitcher = () => {
  const currentTheme = ThemeWorker.getCurrentTheme();

  const themeOptions: OptionType<Theme>[] = [
    {id: "1", value: Theme.DARK, text: "dark"},
    {id: "2", value: Theme.LIGHT, text: "light"},
  ];

  return (
    <Select
      label="Theme: "
      value={currentTheme}
      name="theme"
      options={themeOptions}
      onChange={(value) => {
        ThemeWorker.setTheme(value);
      }}
    />
  );
};
