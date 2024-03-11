import Sinon from "cypress/types/sinon";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHECKBOX_CY = "checkbox";

describe("Checkbox component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

  beforeEach(() => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <Checkbox
        onChange={STUB_FUNCTION}
        dataCy={CHECKBOX_CY}
        isDefaultChecked={false}
      />,
    );
  });

  it("Checkbox is not checked by default if isDefaultChecked is false", () => {
    cy.get(getDataCy(CHECKBOX_CY)).should("not.be.checked");
  });

  it("onClick is triggered when checkbox is clicked", () => {
    cy.get(getDataCy(CHECKBOX_CY)).click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", true);
  });

  it("onChange is triggered when checkbox's state changes", () => {
    cy.get(getDataCy(CHECKBOX_CY)).click().click();
    cy.wrap(STUB_FUNCTION).should("have.been.calledWith", false);
  });

  it("Checkbox is checked by default if isDefaultChecked is true", () => {
    cy.mount(
      <Checkbox
        onChange={STUB_FUNCTION}
        dataCy={CHECKBOX_CY}
        isDefaultChecked={true}
      />,
    );
    cy.get(getDataCy(CHECKBOX_CY)).should("be.checked");
  });
});
