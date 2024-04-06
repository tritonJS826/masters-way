import Sinon from "cypress/types/sinon";
import {Checkbox} from "src/component/checkbox/Checkbox";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHECKBOX_CY = "checkbox";

let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

/**
 *Create test checkbox component
 */
const createTestCheckbox = (isDefaultChecked?: boolean) => {
  STUB_FUNCTION = cy.spy();

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
    cy.mount(createTestCheckbox(false));
    cy.get(getDataCy(CHECKBOX_CY)).should("not.be.checked");
  });

  it("should  bexchecked if isDefaultChecked is true", () => {
    cy.mount(createTestCheckbox(true));
    cy.get(getDataCy(CHECKBOX_CY)).should("be.checked");
  });

  it("onChange callback shout triggered when checkbox is clicked", () => {
    cy.mount(createTestCheckbox());
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", true);
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", false);
  });
});
