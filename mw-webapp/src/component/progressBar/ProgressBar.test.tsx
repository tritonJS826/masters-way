import {render, screen} from "@testing-library/react";
import {ProgressBar} from "src/component/progressBar/ProgressBar";

type getValueType = (value: number, max: number) => string;

const PROGRESS_BAR_CY = {
  root: "progress-bar-root",
  leftLabel: "progress-bar-left-label",
  rightLabel: "progress-bar-right-label",
};
const VALUE = 50;
const MAX = 200;

/**
 * Render ProgressBar component
 */
const renderProgressBar = (props?: {

  /**
   * GetRightValueLabel function
   */
  getRightValueLabel: getValueType;

  /**
   * GetLeftValueLabel function
   */
  getLeftValueLabel: getValueType;

}) => {
  return render(
    <ProgressBar
      value={VALUE}
      max={MAX}
      cy={PROGRESS_BAR_CY}
      getRightValueLabel={props?.getRightValueLabel}
      getLeftValueLabel={props?.getLeftValueLabel}
      textToLabel="Metrics"
    />,
  );
};

describe("ProgressBar component", () => {
  it("should render ProgressBar component correctly with default progress labels left value", () => {
    const MAX_PERCENTAGE = 100;
    renderProgressBar();
    expect(screen.getByTestId(PROGRESS_BAR_CY.root)).toBeInTheDocument();
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

    renderProgressBar({getRightValueLabel: customRightLabel, getLeftValueLabel: customLeftLabel});
    expect(screen.getByTestId(PROGRESS_BAR_CY.rightLabel)).toHaveTextContent(customRightLabel(VALUE, MAX));
    expect(screen.getByTestId(PROGRESS_BAR_CY.leftLabel)).toHaveTextContent(customLeftLabel(VALUE, MAX));
  });
});
