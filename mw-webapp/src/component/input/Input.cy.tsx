import {HTMLInputTypeAttribute} from "react";
import {Input} from "src/component/input/Input";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const INPUT_CY = "input";
const INPUT_VALUE = "Text";
const INPUT_PLACEHOLDER = "Enter text";
const INPUT_VALUE_EMAIL = "test@example.com";
const INPUT_VALUE_NUMBER = 1111;

/**
 *Create test input component
 */
const createTestInput = (type: HTMLInputTypeAttribute, value: string | number, disabled: boolean = false) => {
  return (
    <Input
      dataCy={INPUT_CY}
      value={value}
      placeholder={INPUT_PLACEHOLDER}
      required={true}
      disabled={disabled}
      onChange={() => {}}
      type={type}
    />
  );
};

describe("Input component", () => {

  it("renders with placeholder visible", () => {
    cy.mount(createTestInput("text", INPUT_VALUE));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "placeholder", INPUT_PLACEHOLDER);
  });

  it("works with input mode text", () => {
    cy.mount(createTestInput("text", INPUT_VALUE));
    cy.get(getDataCy(INPUT_CY)).should("have.value", INPUT_VALUE);
  });

  it("works with input mode email", () => {
    cy.mount(createTestInput("email", INPUT_VALUE_EMAIL));
    cy.get(getDataCy(INPUT_CY)).should("have.value", INPUT_VALUE_EMAIL);
  });

  it("works with input mode number", () => {
    cy.mount(createTestInput("number", INPUT_VALUE_NUMBER));
    cy.get(getDataCy(INPUT_CY)).should("have.value", INPUT_VALUE_NUMBER);
  });

  it("cannot be used when disabled", () => {
    cy.mount(createTestInput("text", INPUT_VALUE, true));
    cy.get(getDataCy(INPUT_CY)).should("be.disabled");
  });

  it("input checks to have an attribute \"required\"", () => {
    cy.mount(createTestInput("text", INPUT_VALUE));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "required");
  });
});
