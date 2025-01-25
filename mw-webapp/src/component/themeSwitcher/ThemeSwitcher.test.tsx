import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ThemeSwitcher} from "src/component/themeSwitcher/ThemeSwitcher";
import {Language} from "src/globalStore/LanguageStore";
import {Theme} from "src/globalStore/ThemeStore";
import {describe, expect, it, vi} from "vitest";

const THEME_SWITCHER = "theme-switcher";

/**
 * Render ThemeSwitcher component
 */
const renderThemeSwitcher = (onClick = vi.fn()) => {
  render(
    <ThemeSwitcher
      theme={Theme.DARK}
      language={Language.ENGLISH}
      onClick={onClick}
      dataCy={THEME_SWITCHER}
    />,
  );
};

describe("ThemeSwitcher component", () => {
  it("should render the ThemeSwitcher component", () => {
    renderThemeSwitcher();
    const themeSwitcher = screen.getByTestId(THEME_SWITCHER);

    expect(themeSwitcher).toBeInTheDocument();
  });

  it("should call onClick with the correct theme when clicked", async () => {
    const mockOnClick = vi.fn();
    const user = userEvent.setup();

    renderThemeSwitcher(mockOnClick);

    const themeSwitcher = screen.getByTestId(THEME_SWITCHER);

    await user.click(themeSwitcher);

    expect(mockOnClick).toHaveBeenCalledWith(Theme.LIGHT);
  });
});
