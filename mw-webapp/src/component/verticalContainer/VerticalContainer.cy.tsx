import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const VERTICAL_CONTAINER_CY = "VerticalContainer";

describe("VerticalContainer component", () => {

  beforeEach(() => {
    cy.mount(
      <VerticalContainer dataCy={VERTICAL_CONTAINER_CY}>
        {CHILDRENS_TEXT.map((text, index) => (
          <div key={index}>
            {text}
          </div>
        ))}
      </VerticalContainer>,
    );
  });

  it("should applies default styles", () => {
    cy.get(getDataCy(VERTICAL_CONTAINER_CY)).should("have.css", "display", "flex");
    cy.get(getDataCy(VERTICAL_CONTAINER_CY)).should("have.css", "flex-direction", "column");
  });

  it("should renders children in correct order", () => {
    cy.get(getDataCy(VERTICAL_CONTAINER_CY)).children().each(($child, index) => {
      cy.wrap($child).should("contain.text", CHILDRENS_TEXT[index]);
    });
  });
});
