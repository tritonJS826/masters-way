import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {EditableText} from "src/component/editableText/EditableText";
import {LanguageService} from "src/service/LanguageService";

/**
 * CreateTestEditableText props
 */
interface CyDataEditableText {

  /**
   * EditableTex value
   */
  value: string | number;

  /**
   * EditableTex type (what type of value is expected)
   * @default "text"
   */
  type?: InputType;
}

/**
 *InputType
 */
enum InputType {
  Text = "text",
  Number = "number",
}

const EDITABLETEXT_CY = {
  trigger: "trigger",
  inputCy: "input",
  placeholder: "Enter text",
};

const EDITABLETEXTINPUT_VALUE = "Text";
const EDITABLETEXTINPUT_PLACEHOLDER = "Enter text";
const EDITABLETEXTINPUT_VALUE_NUMBER = 1111;
const EDITEBLETEXTINPUT_TYPE_TEXT = "textbox";
const EDITEBLETEXTINPUT_TYPE_NUMBER = "spinbutton";

/**
 *Create test EditableText component
 */
const renderTestEditableText = (props: CyDataEditableText) => {
  render(
    <EditableText
      cy={EDITABLETEXT_CY}
      value={props.value}
      onChangeFinish={() => {}}
      isEditable={true}
      type={props.type ?? InputType.Text}
      placeholder={LanguageService.common.emptyMarkdown["en"]}
    />,
  );
};

describe("EditableText component", () => {
  it("should be renders when placeholder is visible", () => {
    renderTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text});

    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const input = screen.getByRole(EDITEBLETEXTINPUT_TYPE_TEXT);
    expect(input).toHaveAttribute("placeholder", EDITABLETEXTINPUT_PLACEHOLDER);
  });

  it("should work with mode 'number'", async () => {
    const user = userEvent.setup();
    renderTestEditableText({value: EDITABLETEXTINPUT_VALUE_NUMBER, type: InputType.Number});

    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const input = screen.getByRole(EDITEBLETEXTINPUT_TYPE_NUMBER);
    await user.type(input, "now"); // Typing into the input

    expect(input).toHaveValue(EDITABLETEXTINPUT_VALUE_NUMBER); // Value should not change due to "number" mode
  });

  it("should render input or div depending on user actions", async () => {
    const user = userEvent.setup();
    renderTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text});

    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const input = screen.getByRole(EDITEBLETEXTINPUT_TYPE_TEXT);
    expect(input).toHaveValue(EDITABLETEXTINPUT_VALUE);

    // Simulate clicking outside to finish editing
    await user.click(document.body);

    expect(screen.queryByRole(EDITEBLETEXTINPUT_TYPE_TEXT)).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent(EDITABLETEXTINPUT_VALUE);
  });

  it("should render div after change is finished", async () => {
    const user = userEvent.setup();
    renderTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text});

    const trigger = screen.getByRole(EDITABLETEXT_CY.trigger);
    fireEvent.dblClick(trigger);

    const input = screen.getByRole(EDITEBLETEXTINPUT_TYPE_TEXT);
    expect(input).toHaveValue(EDITABLETEXTINPUT_VALUE);

    // Simulate pressing Enter to finish editing
    await user.keyboard("{Enter}");

    expect(screen.queryByRole(EDITEBLETEXTINPUT_TYPE_TEXT)).not.toBeInTheDocument();
    expect(trigger).toHaveTextContent(EDITABLETEXTINPUT_VALUE);
  });

});
