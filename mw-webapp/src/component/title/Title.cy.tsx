import "cypress-real-events/support";
import Sinon from "cypress/types/sinon";
import {HeadingLevel, Title} from "src/component/title/Title";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TITLE_CONTENT = "Title";
const TITLE_CY = "title";
const TITLE_LEVEL = HeadingLevel.h1;
const IS_EDITABLE = true;
const ADDITIONAL_CONTENT = "additional";

describe("Title component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

  /**
   * Beginning of the test for the Title component.
   */
  const mountTitle = () => {
    STUB_FUNCTION = cy.spy();
    cy.mount(
      <Title
        text={TITLE_CONTENT}
        level={TITLE_LEVEL}
        dataCy={TITLE_CY}
        isEditable={IS_EDITABLE}
        onChangeFinish={STUB_FUNCTION}
        placeholder=""
      />
      ,
    );
  };

  it("render right value", () => {
    mountTitle();
    cy.get(getDataCy(TITLE_CY)).should("contains.text", TITLE_CONTENT);
    cy.get(TITLE_LEVEL).should("exist");
  });

  it("appropriate level exists on the page (check semantics)", () => {
    mountTitle();
    cy.get(TITLE_LEVEL).should("exist");
  });

  it("should change to input on doubleClick and onChangeFinished triggered", () => {
    mountTitle();
    cy.get(getDataCy(TITLE_CY)).dblclick();
    cy.get("input[type=\"text\"]")
      .type(ADDITIONAL_CONTENT)
      .type("{enter}");

    cy.get(getDataCy(TITLE_CY)).should("contains.text", TITLE_CONTENT + ADDITIONAL_CONTENT);
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });

});
