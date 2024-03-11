import {Input} from "src/component/input/Input";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const INPUT_CY = "input";
const INPUT_VALUE = "Text";
const INPUT_PLACEHOLDER = "Enter text";
const INPUT_VALUE_EMAIL = "test@example.com";
const INPUT_VALUE_NUMBER = 1111;

/**
 *InputType
 */
enum InputType {
  Text = "text",
  Number = "number",
  Email = "email",
}

/**
 * CreateTestInputProps props
 */
export interface createTestInputProps {

  /**
   * Input's value
   */
  value: string | number;

  /**
   * Input's type (what type of value is expected)
   * @default "text"
   */
  type?: InputType;

  /**
   * The input is un-clickable and unusable if true
   * @default false
   */
  disabled?: boolean;
}

/**
 *Create test input component
 */
const createTestInput = (props: createTestInputProps) => {
  return (
    <Input
      dataCy={INPUT_CY}
      value={props.value}
      placeholder={INPUT_PLACEHOLDER}
      required={true}
      disabled={props.disabled ?? false}
      onChange={() => {}}
      type={props.type ?? InputType.Text}
    />
  );
};

describe("Input component", () => {

  it("shoud be renders when placeholder is visible", () => {
    cy.mount(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "placeholder", INPUT_PLACEHOLDER);
  });

  it("shoud be works with input mode text", () => {
    cy.mount(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "type", InputType.Text);
    cy.get(getDataCy(INPUT_CY)).should("have.value", INPUT_VALUE);
  });

  it("shoud be works with input mode email", () => {
    cy.mount(createTestInput({value: INPUT_VALUE_EMAIL, type: InputType.Email}));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "type", InputType.Email);
    cy.get(getDataCy(INPUT_CY)).should("have.value", INPUT_VALUE_EMAIL);
  });

  it("shoud be works with input mode number", () => {
    cy.mount(createTestInput({value: INPUT_VALUE_NUMBER, type: InputType.Number}));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "type", InputType.Number);
    cy.get(getDataCy(INPUT_CY)).then(($input) => {
      const value = $input.val();
      const parsedValue = parseFloat(value as string);
      cy.wrap(parsedValue).should("equal", INPUT_VALUE_NUMBER);
    });
  });

  it("shoud be used when input is disabled", () => {
    cy.mount(createTestInput({value: INPUT_VALUE, type: InputType.Text, disabled: true}));
    cy.get(getDataCy(INPUT_CY)).should("be.disabled");
  });

  it("input checks to have an attribute \"required\"", () => {
    cy.mount(createTestInput({value: INPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(INPUT_CY)).should("have.attr", "required");
  });
});
