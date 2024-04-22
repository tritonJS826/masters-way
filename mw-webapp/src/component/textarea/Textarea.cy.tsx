import {Textarea} from "src/component/textarea/Textarea";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TEXTAREA_CY = "textarea";
const TEXTAREA_VALUE = "text";
const TEXTAREA_PLACEHOLDER = "Enter text";
const TYPE_VALUE = "value";

describe("Textarea component", () => {
  beforeEach(() => {
    cy.mount(
      <Textarea
        cy={TEXTAREA_CY}
        defaultValue={TEXTAREA_VALUE}
        onChange={() => {}}
        placeholder={TEXTAREA_PLACEHOLDER}
      />,
    );
  });

  it("shoud be renders when placeholder is visible", () => {
    cy.get(getDataCy(TEXTAREA_CY)).should("have.attr", "placeholder", TEXTAREA_PLACEHOLDER);
  });

  it("shoud checking value", () => {
    cy.get(getDataCy(TEXTAREA_CY)).should("have.value", TEXTAREA_VALUE);
  });

  it("shoud typing text and check", () => {
    cy.get(getDataCy(TEXTAREA_CY)).type(TYPE_VALUE);
    cy.get(getDataCy(TEXTAREA_CY)).should("have.value", TEXTAREA_VALUE + TYPE_VALUE);
  });

});

