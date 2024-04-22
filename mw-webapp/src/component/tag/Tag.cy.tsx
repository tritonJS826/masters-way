import "cypress-real-events/support";
import Sinon from "cypress/types/sinon";
import {Tag} from "src/component/tag/Tag";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TAG_CONTENT = "tag super tag";

const TAG_CY = {
  dataCyCross: "tag_cross_cy",
  dataCyTag: "tag",
};

describe("Tag component", () => {
  let STUB_FUNCTION: Cypress.Agent<Sinon.SinonSpy>;

  beforeEach(() => {
    STUB_FUNCTION = cy.spy();

    cy.mount(
      <Tag
        tagName={TAG_CONTENT}
        cy={TAG_CY}
        isDeletable
        onDelete={STUB_FUNCTION}
      />,
    );
  });

  it("should render", () => {
    cy.get(getDataCy(TAG_CY.dataCyTag)).should("contains.text", TAG_CONTENT);
  });

  it("should be deletable", () => {
    cy.get(getDataCy(TAG_CY.dataCyTag))
      .realHover()
      .get(getDataCy(TAG_CY.dataCyCross))
      .click();
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });
});

