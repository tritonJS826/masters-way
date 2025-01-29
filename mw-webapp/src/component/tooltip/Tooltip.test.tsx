import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Button} from "src/component/button/Button";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";

const TOOLTIP_CONTENT = "Tooltip value";
const TOOLTIP = "tooltip";
const TOOLTIP_TRIGGER = "tooltip trigger";

describe("Tooltip component", () => {

  /**
   * Render tooltip
   */
  const renderTooltip = () => render(
    <Tooltip
      content={TOOLTIP_CONTENT}
      dataCy={TOOLTIP}
      position={PositionTooltip.BOTTOM}
    >
      <Button
        value={TOOLTIP_TRIGGER}
        onClick={() => {}}
        dataCy={TOOLTIP_TRIGGER}
      />
    </Tooltip>,
  );

  it("should be hidden by default", () => {
    renderTooltip();

    const trigger = screen.getByTestId(TOOLTIP_TRIGGER);
    expect(trigger).toBeVisible();

    const tooltip = screen.queryByTestId(TOOLTIP);
    expect(tooltip).toBeNull();
  });

  it("should show tooltip on hover and render right value", async () => {
    const user = userEvent.setup();
    renderTooltip();

    const trigger = screen.getByTestId(TOOLTIP_TRIGGER);

    await act(async () => {
      await user.hover(trigger);
    });

    const tooltip = await screen.findByTestId(TOOLTIP); // Ждём появления тултипа
    expect(tooltip).toBeVisible();
    expect(tooltip).toHaveTextContent(TOOLTIP_CONTENT);
  });
});
