import {EditableText} from "src/component/editableText/EditableText";
import {LanguageService} from "src/service/LanguageService";
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
    <EditableText
      cy={EDITABLETEXT_CY}
      value={props.value}
      onChangeFinish={() => {}}
      isEditable={true}
      type={props.type ?? InputType.Text}
      placeholder={LanguageService.common.emptyMarkdown["en"]}

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

  it("shoud work with mode 'number'", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE_NUMBER, type: InputType.Number}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).type("now");
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.value", EDITABLETEXTINPUT_VALUE_NUMBER);
  });

  it("shoud render input or div depend on client actions", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.value", EDITABLETEXTINPUT_VALUE);
    cy.get(BODY_DOCUMENT).click(COORDINATES_BODY, COORDINATES_BODY, {force: true});
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("not.exist");
    cy.get(getDataCy(EDITABLETEXT_CY.trigger)).find("div").should("have.text", EDITABLETEXTINPUT_VALUE);
  });

  it("shoud be render div after change finished", () => {
    cy.mount(createTestEditableText({value: EDITABLETEXTINPUT_VALUE, type: InputType.Text}));
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("have.value", EDITABLETEXTINPUT_VALUE);
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .should("exist").trigger("keydown", {key: "Enter"});
    cy.get(getDataCy(EDITABLETEXTINPUT_CY)).should("not.exist");
    cy.get(getDataCy(EDITABLETEXT_CY.trigger)).find("div").should("have.text", EDITABLETEXTINPUT_VALUE);
  });

});
