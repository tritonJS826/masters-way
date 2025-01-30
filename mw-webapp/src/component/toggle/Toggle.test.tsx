import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Toggle} from "src/component/toggle/Toggle";
import {describe, expect, it, vi} from "vitest";

const TOGGLE = "toggle";

describe("Toggle component", () => {

  /**
   * Render toggle component
   */
  const renderToggle = (isDefaultChecked = false, onChange = vi.fn()) => {
    render(
      <Toggle
        onChange={onChange}
        dataCy={TOGGLE}
        isDefaultChecked={isDefaultChecked}
      />,
    );

  };

  it("should not be checked by default if isDefaultChecked is false", () => {
    renderToggle(false);
    const toggle = screen.getByTestId(TOGGLE);
    expect(toggle).not.toBeChecked();
  });

  it("should be checked if isDefaultChecked is true", () => {
    renderToggle(true);
    const toggle = screen.getByTestId(TOGGLE);
    expect(toggle).toBeChecked();
  });

  it("should trigger onChange callback when clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();

    renderToggle(false, mockOnChange);

    const toggle = screen.getByTestId(TOGGLE);

    await act(async () => {
      await user.click(toggle);
    });
    expect(mockOnChange).toHaveBeenCalledWith(true);

    await act(async () => {
      await user.click(toggle);
    });
    expect(mockOnChange).toHaveBeenCalledWith(false);
  });
});
