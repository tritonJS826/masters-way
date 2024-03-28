import {ProgressBar} from "src/component/progressBar/ProgressBar";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const PROGRESS_BAR_CY = "progress-bar";
const VALUE = 50;
const MAX = 100;

describe("ProgressBar component", () => {

  beforeEach(() => {
    cy.mount(
      <ProgressBar
        value={VALUE}
        max={MAX}
        dataCy={PROGRESS_BAR_CY}
      />,
    );
  });

  it("should render ProgressBar component correctly", () => {
    cy.get(getDataCy(PROGRESS_BAR_CY)).should("exist");
  });

  it("should display the correct progress value", () => {
    cy.get(getDataCy(PROGRESS_BAR_CY)).contains(`${VALUE} out of ${MAX} (${VALUE}%)`);
  });

  it("should have a custom value label", () => {

    /**
     *Custom label
     */
    const customLabel = (value: number, max: number) => `Custom label: ${value}/${max}`;

    cy.mount(
      <ProgressBar
        value={VALUE}
        max={MAX}
        dataCy={PROGRESS_BAR_CY}
        getValueLabel={customLabel}
      />,
    );
    cy.get(`[data-cy="${PROGRESS_BAR_CY}"]`).contains(customLabel(VALUE, MAX));
  });

});

