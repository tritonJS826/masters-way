import {act} from "react-dom/test-utils";
import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {vi} from "vitest";

const EDITABLTEXTAREA_VALUE = "text";
const EDITABLTEXTAREA_PLACEHOLDER = "Enter text";
const EDITABLTYPE_VALUE = "value";
const DEFAULT_ROWS_AMOUNT = 1;

const EDITABLETEXT_CY = {
  trigger: "trigger",
  textArea: "input",
};

const changeFinish = vi.fn();

describe("EditableTextarea component", () => {
  beforeEach(() => {
    render(
      <EditableTextarea
        cy={EDITABLETEXT_CY}
        text={EDITABLTEXTAREA_VALUE}
        onChangeFinish={changeFinish}
        placeholder={EDITABLTEXTAREA_PLACEHOLDER}
        rows={DEFAULT_ROWS_AMOUNT}
      />,
    );
  });

  it("should be renders when placeholder is visible", () => {
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textArea = screen.getByText(EDITABLTEXTAREA_VALUE);
    expect(textArea).toHaveAttribute("placeholder", EDITABLTEXTAREA_PLACEHOLDER);
  });

  it("should checking value", () => {
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE);
  });

  it("should render input or div depend on client actions", async () => {
    const user = userEvent.setup();
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE);
    await act(async () => {
      await user.keyboard("{Enter}");
    });

    expect(screen.getByRole(EDITABLETEXT_CY.trigger)).toBeVisible();
    expect(screen.getByText(EDITABLTEXTAREA_VALUE)).toBeVisible();
  });

  it("should typing text and check", async () => {
    const user = userEvent.setup();
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    await act(async () => {
      await user.type(textbox, EDITABLTYPE_VALUE);
    });
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE + EDITABLTYPE_VALUE);
  });

  it("should be able to handle changes when finished", async () => {
    const user = userEvent.setup();
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    await act(async () => {
      await user.type(textbox, EDITABLTYPE_VALUE);
    });
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE + EDITABLTYPE_VALUE);

    // Create a mock blur event with a relatedTarget that won't cause the closest() error
    const mockDiv = document.createElement("div");
    const blurEvent = new FocusEvent("blur", {relatedTarget: mockDiv});

    fireEvent.blur(textbox, blurEvent);

    expect(changeFinish).toHaveBeenCalled();

    await act(async () => {
      await user.dblClick(trigger);
    });
    const textbox2 = screen.getByRole("textbox");
    await act(async () => {
      await user.type(textbox2, "new text");
    });
    expect(textbox2).toHaveValue(EDITABLTEXTAREA_VALUE + EDITABLTYPE_VALUE + "new text");
  });
});
