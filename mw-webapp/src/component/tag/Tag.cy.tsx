import "cypress-real-events/support";
import Sinon from "cypress/types/sinon";
import {Tag, TagType} from "src/component/tag/Tag";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TAG_CONTENT = "tag super tag";

const TAG_CY = {
  dataCyCross: "tag_cross_cy",
  dataCyTag: "tag",
};

describe("Tag component", () => {

  /**
   * Mount Tag component.
   */
  const mountTag = (type: TagType, deleteStub: Cypress.Agent<Sinon.SinonSpy> | null = null) => {
    const deleteProps = deleteStub ? {isDeletable: true, onDelete: deleteStub} : {};

    cy.mount(
      <Tag
        tagName={TAG_CONTENT}
        cy={TAG_CY}
        type={type}
        {...deleteProps}
      />);
  };

  it("should render basic tag", () => {
    mountTag(TagType.BASIC_TAG);
    cy.get(getDataCy(TAG_CY.dataCyTag)).should("contains.text", TAG_CONTENT);
  });

  it("basic tag should be deletable", () => {
    const STUB_FUNCTION = cy.spy();

    mountTag(TagType.BASIC_TAG, STUB_FUNCTION);
    cy.get(getDataCy(TAG_CY.dataCyTag))
      .realHover()
      .get(getDataCy(TAG_CY.dataCyCross))
      .click();
    cy.wrap(STUB_FUNCTION).should("have.been.called");
  });

  it("should render way card tag", () => {
    mountTag(TagType.WAY_CARD_TAG);
    cy.get(getDataCy(TAG_CY.dataCyTag)).should("contains.text", TAG_CONTENT);
  });
});
