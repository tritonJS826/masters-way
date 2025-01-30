import {BrowserRouter} from "react-router-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Header, LOGO_TEXT} from "src/component/header/Header";
import {testUserPreview} from "src/component/header/testUserPreview";
import {languageStore} from "src/globalStore/LanguageStore";
import {themeStore} from "src/globalStore/ThemeStore";
import {vi} from "vitest";

const HEADER_CY = "header";

/**
 * The MockPointerEvent class overrides the default PointerEvent to ensure the dropdown interactions work in tests.
 */
export class MockPointerEvent extends Event {

  /**
   * Indicates which button was pressed on the mouse or pointer device.
   * 0 = Left button, 1 = Middle button, 2 = Right button.
   */
  private button: number | undefined;

  /**
   * Indicates whether the Ctrl key was pressed during the event.
   */
  private ctrlKey: boolean | undefined;

  constructor(type: string, props: PointerEventInit | undefined) {
    super(type, props);
    if (props) {
      if (props.button !== null) {
        this.button = props.button;
      }
      if (props.ctrlKey !== null) {
        this.ctrlKey = props.ctrlKey;
      }
    }
  }

}

window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

describe("Header component", () => {
  let STUB_FUNCTION_SET_LANGUAGE: () => void;
  let STUB_FUNCTION_SET_THEME: () => void;

  beforeEach(() => {
    STUB_FUNCTION_SET_LANGUAGE = vi.fn();
    STUB_FUNCTION_SET_THEME = vi.fn();
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

  it("should call setLanguage function", async () => {
    const triggerButton = screen.getByRole("combobox");
    fireEvent.pointerDown(
      triggerButton,
      new MockPointerEvent("pointerdown", {
        ctrlKey: false,
        button: 0,
      }),
    );

    expect(triggerButton).toHaveAttribute("aria-expanded", "true");
    const uaOption = await screen.findByText("UA");
    expect(uaOption).toBeVisible();
    await userEvent.click(uaOption);

    expect(STUB_FUNCTION_SET_LANGUAGE).toHaveBeenCalled();
  });
});
