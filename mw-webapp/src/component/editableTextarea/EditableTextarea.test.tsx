import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";

const EDITABLTEXTAREA_VALUE = "text";
const EDITABLTEXTAREA_PLACEHOLDER = "Enter text";
const EDITABLTYPE_VALUE = "value";
const DEFAULT_ROWS_AMOUNT = 1;

const EDITABLETEXT_CY = {
  trigger: "trigger",
  textArea: "input",
};

describe("EditableTextarea component", () => {
  beforeEach(() => {
    render(
      <EditableTextarea
        cy={EDITABLETEXT_CY}
        text={EDITABLTEXTAREA_VALUE}
        onChangeFinish={() => {}}
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
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE); //Value should not change due to "number" mode
  });

  it("should render input or div depend on client actions", async () => {
    const user = userEvent.setup();
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE);
    await user.keyboard("{Enter}");

    expect(screen.getByRole(EDITABLETEXT_CY.trigger)).toBeVisible();
    expect(screen.getByText(EDITABLTEXTAREA_VALUE)).toBeVisible();
  });

  it("should typing text and check", async () => {
    const user = userEvent.setup();
    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const textbox = screen.getByRole("textbox");
    await user.type(textbox, EDITABLTYPE_VALUE);
    expect(textbox).toHaveValue(EDITABLTEXTAREA_VALUE + EDITABLTYPE_VALUE);
  });

});
