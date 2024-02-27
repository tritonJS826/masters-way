import "cypress-real-events/support";
import "cypress-real-events";
import {Button} from "src/component/button/Button";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TOOLTIP_CONTENT = "Tooltip value";
const TOOLTIP_CY = "tooltip";
const TOOLTIP_TRIGGER = "tooltip trigger";

describe("Tooltip component", () => {

  /**
   * Beginning of the test for the Tooltip component.
   */
  const mountTooltip = (value: string) => {
    cy.mount(
      <Tooltip
        content={value}
        dataCy={TOOLTIP_CY}
        position={PositionTooltip.BOTTOM}
      >
        <Button
          value={TOOLTIP_TRIGGER}
          onClick={() => { }}
          dataCy={TOOLTIP_TRIGGER}
        />
      </Tooltip>,
    );
  };

  it("render right value", () => {
    mountTooltip(TOOLTIP_CONTENT);
    cy.get(getDataCy(TOOLTIP_CY)).should("contains.text", TOOLTIP_CONTENT);
  });

  it("should be hidden by default", () => {
    mountTooltip(TOOLTIP_CONTENT);
    cy.get(getDataCy(TOOLTIP_TRIGGER)).should("be.visible");
    cy.get(getDataCy(TOOLTIP_CY)).should("not.be.visible");
  });

  it("should show tooltip on hover", () => {
    mountTooltip(TOOLTIP_CONTENT);
    cy.get(getDataCy(TOOLTIP_CY)).should("not.be.visible");
    cy.get(getDataCy(TOOLTIP_TRIGGER)).realHover();
    cy.get(getDataCy(TOOLTIP_CY)).should("be.visible");
  });

});
