
import {App} from "src/App";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const HEADER_CY = "header";
const LOGO_ALT_TEXT = "Master's way";

describe("Header component", () => {

  beforeEach(() => {
    cy.mount(
      <App />,
    );
  });

  it("Alt text visible if source broken", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("have.attr", "alt", LOGO_ALT_TEXT);
  });

  it("Image visible if source exists", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("be.visible");
  });

});
