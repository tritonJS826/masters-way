import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Textarea} from "src/component/textarea/Textarea";
import {vi} from "vitest";

const TEXTAREA = "textarea";
const TEXTAREA_VALUE = "text";
const TEXTAREA_PLACEHOLDER = "Enter text";
const TYPE_VALUE = "value";

/**
 * Render Textarea component
 */
const renderTextarea = (onChange = vi.fn()) =>
  render(
    <Textarea
      cy={TEXTAREA}
      defaultValue={TEXTAREA_VALUE}
      onChange={onChange}
      placeholder={TEXTAREA_PLACEHOLDER}
    />,
  );

describe("Textarea component", () => {
  it("should render with the correct placeholder", () => {
    renderTextarea();
    const textarea = screen.getByTestId(TEXTAREA);

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute("placeholder", TEXTAREA_PLACEHOLDER);
  });

  it("should have the correct default value", () => {
    renderTextarea();
    const textarea = screen.getByTestId(TEXTAREA);

    expect(textarea).toHaveValue(TEXTAREA_VALUE);
  });

  it("should allow typing text and update value", async () => {
    const user = userEvent.setup();
    renderTextarea();
    const textarea = screen.getByTestId(TEXTAREA);

    await user.type(textarea, TYPE_VALUE);

    expect(textarea).toHaveValue(TEXTAREA_VALUE + TYPE_VALUE);
  });

  it("should call onChange when typing", async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();
    renderTextarea(mockOnChange);
    const textarea = screen.getByTestId(TEXTAREA);

    await user.type(textarea, TYPE_VALUE);

    expect(mockOnChange).toHaveBeenCalled();
  });
});
