import Sinon from "cypress/types/sinon";
import {Input} from "src/component/input/Input";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const INPUT_CY = "input";
const INPUT_VALUE = "Text";
const INPUT_PLACEHOLDER = "Enter text";
const INPUT_VALUE_EMAIL = "test@example.com";
const INPUT_VALUE_NUMBER = "1111";

describe("Input component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

  beforeEach(() => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <Input
        dataCy={INPUT_CY}
        value={INPUT_VALUE}
        placeholder={INPUT_PLACEHOLDER}
        required={true}
        onChange={STUB_FUNCTION}
      />,
    );
  });

  it("renders with placeholder visible", () => {
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "placeholder", INPUT_PLACEHOLDER);
  });

  it("works with input mode text", () => {
    cy.get(getDataCy(INPUT_CY)).type(INPUT_VALUE).should("have.value", INPUT_VALUE);
  });

  it("works with input mode email", () => {
    cy.mount(
      <Input
        dataCy={INPUT_CY}
        value={INPUT_VALUE_EMAIL}
        onChange={STUB_FUNCTION}
      />,
    );
    cy.get(getDataCy(INPUT_CY)).type(INPUT_VALUE_EMAIL).should("have.value", INPUT_VALUE_EMAIL);
  });

  it("works with input mode number", () => {
    cy.mount(
      <Input
        dataCy={INPUT_CY}
        value={INPUT_VALUE_NUMBER}
        onChange={STUB_FUNCTION}
      />,
    );
    cy.get(getDataCy(INPUT_CY)).clear().type(INPUT_VALUE_NUMBER).should("have.value", INPUT_VALUE_NUMBER);
  });

  it("cannot be used when disabled", () => {
    cy.mount(
      <Input
        dataCy={INPUT_CY}
        value={INPUT_VALUE_NUMBER}
        onChange={STUB_FUNCTION}
        disabled={true}
      />,
    );
    cy.get(getDataCy(INPUT_CY)).should("be.disabled");
  });

  it("checks \"required\" logic", () => {
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "required");
  });
});
