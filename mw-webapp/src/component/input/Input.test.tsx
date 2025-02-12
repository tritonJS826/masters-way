import {render, screen} from "@testing-library/react";
import {Input} from "src/component/input/Input";

const INPUT_CY = "input";
const INPUT_VALUE = "Text";
const INPUT_PLACEHOLDER = "Enter text";
const INPUT_VALUE_EMAIL = "test@example.com";
const INPUT_VALUE_NUMBER = 1111;

/**
 *InputType
 */
enum InputType {
  Text = "text",
  Number = "number",
  Email = "email",
}

/**
 * CreateTestInputProps props
 */
export interface createTestInputProps {

  /**
   * Input's value
   */
  value: string | number;

  /**
   * Input's type (what type of value is expected)
   * @default "text"
   */
  type?: InputType;

  /**
   * The input is un-clickable and unusable if true
   * @default false
   */
  disabled?: boolean;
}

/**
 *Create test input component
 */
const createTestInput = (props: createTestInputProps) => {
  return (
    <Input
      dataCy={INPUT_CY}
      value={props.value}
      placeholder={INPUT_PLACEHOLDER}
      required={true}
      disabled={props.disabled ?? false}
      onChange={() => {}}
      type={props.type ?? InputType.Text}
    />
  );
};

describe("Input component", () => {
  it("The component should render when the placeholder is visible.", () => {
    render(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    const input = screen.getByRole("textbox");
    expect(input).toBeVisible();
    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument();
  });

  it("should be works with input mode text", () => {
    render(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", InputType.Text);
    expect(input).toHaveValue(INPUT_VALUE);
  });

  it("should be works with input mode email", () => {
    render(
      createTestInput({value: INPUT_VALUE_EMAIL, type: InputType.Email}),
    );
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", InputType.Email);
    expect(input).toHaveValue(INPUT_VALUE_EMAIL);
  });

  it("should be works with input mode number", () => {
    render(
      createTestInput({value: INPUT_VALUE_NUMBER, type: InputType.Number}),
    );
    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", InputType.Number);
    expect(input).toHaveValue(INPUT_VALUE_NUMBER);
  });

  it("should be used when input is disabled", () => {
    render(
      createTestInput({
        value: INPUT_VALUE,
        type: InputType.Text,
        disabled: true,
      }),
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("input checks to have an attribute required", () => {
    render(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("required");
  });
});
