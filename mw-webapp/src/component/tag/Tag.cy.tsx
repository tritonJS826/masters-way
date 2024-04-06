import "cypress-real-events/support";
import {Tag} from "src/component/tag/Tag";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TAG_CONTENT = "tag super tag";
const TAG_CY = "tag";

describe("Tag component", () => {

  /**
   * Mount tag
   */
  const mountTag = (content: string) => {
    cy.mount(
      <Tag
        tagName={content}
        dataCy={TAG_CY}
      />,
    );

  };

  it("render right value", () => {
    mountTag(TAG_CONTENT);
    cy.get(getDataCy(TAG_CY)).should("contains.text", TAG_CONTENT);
  });
});

