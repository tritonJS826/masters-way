import {fireEvent, render, screen} from "@testing-library/react";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {describe, expect, it, vi} from "vitest";

/**
 * Beginning of the test for the Checkbox component
 */
const renderCheckbox = (isDefaultChecked = false, onChange = vi.fn()) => {
  render(
    <Checkbox
      onChange={onChange}
      isDefaultChecked={isDefaultChecked}
    />,
  );

  return onChange;
};

describe("Checkbox component", () => {
  it("should not be checked by default if isDefaultChecked is false", () => {
    renderCheckbox(false);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should be checked if isDefaultChecked is true", () => {
    renderCheckbox(true);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("onChange callback should be triggered when checkbox is clicked", () => {
    const onChange = renderCheckbox();
    const checkbox = screen.getByRole("checkbox");

    // First click
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);

    // Second click
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
