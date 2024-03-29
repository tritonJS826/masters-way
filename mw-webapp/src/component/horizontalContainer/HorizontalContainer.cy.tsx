
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const HORIZONTAL_CONTAINER_CY = "HorizontalContainer";

describe("HorizontalContainer component", () => {

  beforeEach(() => {
    cy.mount(
      <HorizontalContainer dataCy={HORIZONTAL_CONTAINER_CY}>
        {CHILDRENS_TEXT.map((text, index) => (
          <div key={index}>
            {text}
          </div>
        ))}
      </HorizontalContainer>,
    );
  });

  it("should render HorizontalContainer correctly", () => {
    cy.get(getDataCy(HORIZONTAL_CONTAINER_CY)).should("exist");
  });

  it("should applies default styles", () => {
    cy.get(getDataCy(HORIZONTAL_CONTAINER_CY)).should("have.css", "display", "flex");
  });

  it("should renders children in correct order", () => {
    cy.get(getDataCy(HORIZONTAL_CONTAINER_CY)).children().each(($child, index) => {
      cy.wrap($child).should("contain.text", CHILDRENS_TEXT[index]);
    });
  });
});
