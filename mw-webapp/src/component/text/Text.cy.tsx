import {Text} from "src/component/text/Text";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const TEXT_CY = "text";
const TEXT_VALUE = "Hello World";

describe("Text component", () => {
  it("should render text when it is provided", () => {
    cy.mount(
      <Text
        text={TEXT_VALUE}
        cy={TEXT_CY}
      />,
    );
    cy.get(getDataCy(TEXT_CY)).should("contain.text", TEXT_VALUE);
  });

  it("should not render anything when text is empty", () => {
    cy.mount(
      <Text
        text=""
        cy={TEXT_CY}
      />,
    );
    cy.get(getDataCy(TEXT_CY)).should("be.empty");
  });
});
