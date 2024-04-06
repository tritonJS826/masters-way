import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const PROGRESS_BAR_CY = {
  root: "progress-bar-root",
  leftLabel: "progress-bar-left-label",
  rightLabel: "progress-bar-right-label",
};
const VALUE = 50;
const MAX = 200;

describe("ProgressBar component", () => {

  beforeEach(() => {
    cy.mount(
      <ProgressBar
        value={VALUE}
        max={MAX}
        cy={PROGRESS_BAR_CY}
      />,
    );
  });

  it("should render ProgressBar component correctly", () => {
    cy.get(getDataCy(PROGRESS_BAR_CY.root)).should("exist");
  });

  it("should display the correct default progress labels left value", () => {
    const MAX_PERCENTAGE = 100;
    cy.get(getDataCy(PROGRESS_BAR_CY.leftLabel)).contains(`${VALUE / MAX * MAX_PERCENTAGE}%`);
    cy.get(getDataCy(PROGRESS_BAR_CY.rightLabel)).contains(`${VALUE} / ${MAX}`);
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

    cy.mount(
      <ProgressBar
        value={VALUE}
        max={MAX}
        cy={PROGRESS_BAR_CY}
        getRightValueLabel={customRightLabel}
        getLeftValueLabel={customLeftLabel}
      />,
    );
    cy.get(getDataCy(PROGRESS_BAR_CY.rightLabel)).contains(customRightLabel(VALUE, MAX));
  });

});

