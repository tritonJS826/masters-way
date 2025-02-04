import {act} from "react-dom/test-utils";
import {BrowserRouter} from "react-router-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Header, LOGO_TEXT} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {withMockPointerEvents} from "src/utils/mockPointerEvents";
import {vi} from "vitest";

const HEADER_CY = "header";

describe("Header component", () => {
  const STUB_FUNCTION_SET_LANGUAGE: () => void = vi.fn();
  const STUB_FUNCTION_SET_THEME: () => void = vi.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Header
          dataCy={HEADER_CY}
          user={testUserPreview}
          clearUser={() => {}}
          setLanguage={STUB_FUNCTION_SET_LANGUAGE}
          language={languageStore.language}
          theme={themeStore.theme}
          setTheme={STUB_FUNCTION_SET_THEME}
          openNotificationBlock={() => {}}
          unreadNotificationsAmount={null}
          isNotificationBlockOpen={false}
          isConnectionEstablished={false}
        />
      </BrowserRouter>,
    );
  });

  it("Alt text in logotype shout be  visible if source broken", () => {
    expect(screen.getByRole("img")).toHaveAttribute("alt", LOGO_TEXT);
  });

  it("Logotype image shout be visible if source exists", () => {
    expect(screen.getByRole("img")).toBeVisible();
  });

  it("should call setTheme functions", () => {
    const themeSwitcher = screen.getByTestId("themeSwitcher");
    fireEvent.click(themeSwitcher);
    expect(STUB_FUNCTION_SET_THEME).toHaveBeenCalled();
  });

  it("should call setLanguage function", withMockPointerEvents(async () => {
    const triggerButton = screen.getByRole("combobox");
    userEvent.click(triggerButton);
    const uaOption = await screen.findByText("UA");
    await act(async () => await userEvent.click(uaOption));
    expect(STUB_FUNCTION_SET_LANGUAGE).toHaveBeenCalled();
  }));
});
