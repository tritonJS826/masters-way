import Sinon from "cypress/types/sinon";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHECKBOX_CY = "checkbox";

describe("Checkbox component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;
  const isDefaultChecked = false;

  beforeEach(() => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <Checkbox
        onChange={STUB_FUNCTION}
        dataCy={CHECKBOX_CY}
        isDefaultChecked={isDefaultChecked}
      />,
    );
  });

  it("Checkbox is not checked by default if isDefaultChecked is false", () => {
    if (!isDefaultChecked) {
      cy.get(getDataCy(CHECKBOX_CY)).should("not.be.checked");
    } else {
      cy.get(getDataCy(CHECKBOX_CY)).should("be.checked");
    }
  });

  it("onClick is triggered when checkbox is clicked", () => {
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", true);
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", false);
  });
});
