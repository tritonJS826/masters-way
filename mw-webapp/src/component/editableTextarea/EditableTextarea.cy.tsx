import {EditableTextarea} from "src/component/editableTextarea/editableTextarea";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const EDITABLTEXTAREA_VALUE = "text";
const EDITABLTEXTAREA_PLACEHOLDER = "Enter text";
const EDITABLTYPE_VALUE = "value";
const DEFAULT_ROWS_AMOUNT = 1;

const EDITABLETEXT_CY = {
  trigger: "trigger",
  textArea: "input",
};

describe("EditableTextarea component", () => {
  beforeEach(() => {
    cy.mount(
      <EditableTextarea
        cy={EDITABLETEXT_CY}
        text={EDITABLTEXTAREA_VALUE}
        onChangeFinish={() => {}}
        placeholder={EDITABLTEXTAREA_PLACEHOLDER}
        rows={DEFAULT_ROWS_AMOUNT}
      />,
    );
  });

  it("shoud be renders when placeholder is visible", () => {
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXT_CY.textArea)).should("have.attr", "placeholder", EDITABLTEXTAREA_PLACEHOLDER);
  });

  it("shoud checking value", () => {
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXT_CY.textArea)).should("have.value", EDITABLTEXTAREA_VALUE);
  });

  it("shoud render input or span depend on client actions", () => {
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXT_CY.textArea)).should("have.value", EDITABLTEXTAREA_VALUE);
    cy.get(getDataCy(EDITABLETEXT_CY.trigger)).should("exist").trigger("keydown", {key: "Enter", ctrlKey: true});
    cy.get(getDataCy(EDITABLETEXT_CY.trigger)).find("span").should("have.text", EDITABLTEXTAREA_VALUE);
  });

  it("shoud typing text and check", () => {
    cy.get(getDataCy(EDITABLETEXT_CY.trigger))
      .dblclick();
    cy.get(getDataCy(EDITABLETEXT_CY.textArea)).type(EDITABLTYPE_VALUE);
    cy.get(getDataCy(EDITABLETEXT_CY.textArea)).should("have.value", EDITABLTEXTAREA_VALUE + EDITABLTYPE_VALUE);
  });
});

