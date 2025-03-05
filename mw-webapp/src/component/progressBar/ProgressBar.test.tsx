import {render, screen} from "@testing-library/react";
import {ProgressBar} from "src/component/progressBar/ProgressBar";

const PROGRESS_BAR_CY = {
  root: "progress-bar-root",
  leftLabel: "progress-bar-left-label",
  rightLabel: "progress-bar-right-label",
};
const VALUE = 50;
const MAX = 200;

describe("ProgressBar component", () => {
  it("should render ProgressBar component correctly", () => {
    render(
      <ProgressBar
        value={VALUE}
        max={MAX}
        cy={PROGRESS_BAR_CY}
      />,
    );
    expect(screen.getByTestId(PROGRESS_BAR_CY.root)).toBeInTheDocument();
  });

  it("should display the correct default progress labels left value", () => {
    const MAX_PERCENTAGE = 100;
    render(
      <ProgressBar
        value={VALUE}
        max={MAX}
        cy={PROGRESS_BAR_CY}
      />,
    );
    expect(screen.getByTestId(PROGRESS_BAR_CY.leftLabel)).toHaveTextContent(`${(VALUE / MAX) * MAX_PERCENTAGE}%`);
    expect(screen.getByTestId(PROGRESS_BAR_CY.rightLabel)).toHaveTextContent(`${VALUE} / ${MAX}`);
  });

  it("should have a custom value label", () => {

    /**
     * Custom  right label
     */
    const customRightLabel = (value: number, max: number) => `Custom right label: ${value}/${max}`;

    /**
     * Custom left label
     */
    const customLeftLabel = (value: number, max: number) => `Custom left label: ${value}/${max}`;

    render(
      <ProgressBar
        value={VALUE}
        max={MAX}
        cy={PROGRESS_BAR_CY}
        getRightValueLabel={customRightLabel}
        getLeftValueLabel={customLeftLabel}
      />,
    );

    expect(screen.getByTestId(PROGRESS_BAR_CY.rightLabel)).toHaveTextContent(customRightLabel(VALUE, MAX));
    expect(screen.getByTestId(PROGRESS_BAR_CY.leftLabel)).toHaveTextContent(customLeftLabel(VALUE, MAX));
  });
});
