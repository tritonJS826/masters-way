
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const HORIZONTAL_CRID_CONTAINER_CY = "HorizontalGridContainer";

describe("HorizontalGridContainer component", () => {

  beforeEach(() => {
    cy.mount(
      <HorizontalGridContainer dataCy={HORIZONTAL_CRID_CONTAINER_CY}>
        {CHILDRENS_TEXT.map((text, index) => (
          <div key={index}>
            {text}
          </div>
        ))}
      </HorizontalGridContainer>,
    );
  });

  it("should render HorizontalGridContainer correctly", () => {
    cy.get(getDataCy(HORIZONTAL_CRID_CONTAINER_CY)).should("exist");
  });

  it("should applies default styles", () => {
    cy.get(getDataCy(HORIZONTAL_CRID_CONTAINER_CY)).should("have.css", "display", "grid");
  });

  it("should renders children in correct order", () => {
    cy.get(getDataCy(HORIZONTAL_CRID_CONTAINER_CY)).children().each(($child, index) => {
      cy.wrap($child).should("contain.text", CHILDRENS_TEXT[index]);
    });
  });
});
