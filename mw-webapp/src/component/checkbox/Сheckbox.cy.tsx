import Sinon from "cypress/types/sinon";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHECKBOX_CY = "checkbox";

let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

/**
 *Create test input component
 */
const createTestInput = (isDefaultChecked?: boolean) => {
  return (
    <Checkbox
      onChange={STUB_FUNCTION}
      dataCy={CHECKBOX_CY}
      isDefaultChecked={isDefaultChecked ?? false}
    />
  );
};

describe("Checkbox component", () => {
  it("should not be checked by default if isDefaultChecked is false", () => {
    cy.mount(createTestInput(false));
    cy.get(getDataCy(CHECKBOX_CY)).should("not.be.checked");
  });

  it("should  bexchecked if isDefaultChecked is true", () => {
    cy.mount(createTestInput(true));
    cy.get(getDataCy(CHECKBOX_CY)).should("be.checked");
  });

  it("onChange callback shout triggered when checkbox is clicked", () => {
    STUB_FUNCTION = cy.spy();
    cy.mount(createTestInput());
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", true);
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", false);
  });
});
