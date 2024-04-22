import Sinon from "cypress/types/sinon";
import {Toggle} from "src/component/toggle/Toggle";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHECKBOX_CY = "checkbox";

let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

/**
 *Create test checkbox component
 */
const createTestCheckbox = (isDefaultChecked?: boolean) => {
  return (
    <Toggle
      onChange={STUB_FUNCTION}
      dataCy={CHECKBOX_CY}
      isDefaultChecked={isDefaultChecked ?? false}
    />
  );
};

describe("Checkbox component", () => {
  it("should not be checked by default if isDefaultChecked is false", () => {
    cy.mount(createTestCheckbox(false));
    cy.get(getDataCy(CHECKBOX_CY)).should("not.be.checked");
  });

  it("should  be checked if isDefaultChecked is true", () => {
    cy.mount(createTestCheckbox(true));
    cy.get(getDataCy(CHECKBOX_CY)).should("be.checked");
  });

  it("onChange callback shout triggered when checkbox is clicked", () => {
    STUB_FUNCTION = cy.spy();
    cy.mount(createTestCheckbox());
    cy.get(getDataCy(CHECKBOX_CY)).click({force: true});
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", true);
    cy.get(getDataCy(CHECKBOX_CY)).click({force: true});
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", false);
  });
});
