import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "src/component/button/Button";
import {vi} from "vitest";

const BUTTON_VALUE = "Click button";

/**
 * Renders Button component
 */
const renderButton = (onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>) => {
  return render(
    <Button
      value={BUTTON_VALUE}
      onClick={onClick ?? (() => {})}
    />,
  );
};

describe("Button component", () => {
  it("should render a right value", () => {
    renderButton();
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(BUTTON_VALUE);
  });

  it("onClick is triggered when button is clicked", async () => {
    const user = userEvent.setup();
    const clickCallback = vi.fn();
    renderButton(clickCallback);
    const button = screen.getByRole("button");

    await act(async () => {
      await user.click(button);
    });

    expect(clickCallback).toHaveBeenCalled();
  });
});
