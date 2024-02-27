import "cypress-real-events/support";
import "cypress-real-events";
import {HeadingLevel, Title} from "src/component/title/Title";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TITLE_CONTENT = "Title";
const TITLE_CY = "title";
const TITLE_LEVEL = HeadingLevel.h1;
const IS_EDITABLE = true;

describe("Tooltip component", () => {

  /**
   * Beginning of the test for the Title component.
   */
  const mountTitle = () => {
    cy.mount(
      <Title
        text={TITLE_CONTENT}
        level={TITLE_LEVEL}
        dataCy={TITLE_CY}
        isEditable={IS_EDITABLE}
      />
      ,
    );
  };

  it("render right value", () => {
    mountTitle();
    cy.get(getDataCy(TITLE_CY)).should("contains.text", TITLE_CONTENT);
  });

  it("appropriate level exists on the page (check semantics)", () => {
    mountTitle();
    cy.get(getDataCy(TITLE_CY))
      .children()
      .first()
      .invoke("prop", "tagName")
      .then($tag => $tag.toLowerCase())
      .should("eq", TITLE_LEVEL);
  });

  it("should change to input on doubleClick", () => {
    mountTitle();
    cy.get(getDataCy(TITLE_CY))
      .dblclick()
      .children()
      .first()
      .invoke("prop", "tagName")
      .then($tag => $tag.toLowerCase())
      .should("eq", "input");
  });

});
