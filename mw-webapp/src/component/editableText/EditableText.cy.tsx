import {EditableValue} from "src/component/editableText/EditableText";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

/**
 * CreateTestEditableText props
 */
interface CyDataEditableText {

  /**
   * EditableTex value
   */
  value: string | number;

  /**
   * EditableTex type (what type of value is expected)
   * @default "text"
   */
  type?: InputType;
}

/**
 *InputType
 */
enum InputType {
  Text = "text",
  Number = "number",
}

const EDITABLETEXT_CY = {
  trigger: "trigger",
  inputCy: "input",
  placeholder: "Enter text",
};

const EDITABLETEXTINPUT_CY = "input";
const EDITABLETEXTINPUT_VALUE = "Text";
const EDITABLETEXTINPUT_PLACEHOLDER = "Enter text";
const EDITABLETEXTINPUT_VALUE_NUMBER = 1111;
const BODY_DOCUMENT = "body";
const COORDINATES_BODY = 50;

/**
 *Create test EditableText component
 */
const createTestEditableText = (props: CyDataEditableText) => {
  return (
    <EditableValue
      cy={EDITABLETEXT_CY}
      value={props.value}
      onChangeFinish={() => {}}
      isEditable={true}
      type={props.type ?? InputType.Text}
    />
  );
};

describe("EditableText component", () => {
  it("shoud be renders when placeholder is visible", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.attr", "placeholder", EDITABLETEXTINPUT_PLACEHOLDER);
  });

  it("shoud be works with EditableText mode number", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE_NUMBER, type: InputType.Number}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.attr", "type", InputType.Number);
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.value", EDITABLETEXTINPUT_VALUE_NUMBER);
  });

  it("shoud be render input or span depend on client actions", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.attr", "placeholder", EDITABLETEXTINPUT_PLACEHOLDER);
    cy.get(BODY_DOCUMENT).click(COORDINATES_BODY, COORDINATES_BODY, {force: true});
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("not.exist");
  });

});
