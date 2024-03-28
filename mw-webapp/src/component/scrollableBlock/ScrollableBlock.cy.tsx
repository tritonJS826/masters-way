import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHILDRENS_TEXT = [
  "Example text 1,Example text 1,Example text 1,Example text 1,Example text 1,Example text 1,Example text 1",
  "Example text 2,Example text 2,Example text 2,Example text 2,Example text 2,Example text 2,Example text 2",
  "Example text 3,Example text 3,Example text 3,Example text 3,Example text 3,Example text 3,Example text 3",
];
const SCROLLABLE_BLOCK_CY = "ScrollableBlock";
const WIDTH = "150px";
const HEIGHT = "200px";

describe("ScrollableBlock component", () => {
  beforeEach(() => {
    cy.mount(
      <ScrollableBlock
        dataCy={SCROLLABLE_BLOCK_CY}
        height={HEIGHT}
        width={WIDTH}
      >
        {CHILDRENS_TEXT.map((text, index) => (
          <div key={index}>
            {text}
          </div>
        ))}
      </ScrollableBlock>,
    );
  });

  it("should render ScrollableBlock correctly", () => {
    cy.get(getDataCy(SCROLLABLE_BLOCK_CY)).should("exist");
  });
  it("should scroll content if it overflows the block", () => {
    cy.get(getDataCy(SCROLLABLE_BLOCK_CY)).should("have.css", "width", WIDTH);
    cy.get(getDataCy(SCROLLABLE_BLOCK_CY)).should("have.css", "height", HEIGHT);

    cy.get(getDataCy(SCROLLABLE_BLOCK_CY)).should(
      "have.css",
      "overflow",
      "auto",
    );
  });
});
