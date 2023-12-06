import Sinon from "cypress/types/sinon";
import {Button} from "src/component/button/Button";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const BUTTON_VALUE = "Click button";
const BUTTON_CY = "button1";

describe("Button component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

  beforeEach(() => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <Button
        value={BUTTON_VALUE}
        onClick={STUB_FUNCTION}
        dataCy={BUTTON_CY}
      />);
  });

  it("render right value", () => {
    cy.get(getDataCy(BUTTON_CY)).should("contains.text", BUTTON_VALUE);
  });

  it("onClick is triggered when button is clicked", () => {
    cy.get(getDataCy(BUTTON_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });
});