
import {App} from "src/App";
import {LOGO_TEXT} from "src/component/header/Header";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const HEADER_CY = "header";

describe("Header component", () => {

  beforeEach(() => {
    cy.mount(
      <App />,
    );
  });

  it("Alt text visible if source broken", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("have.attr", "alt", LOGO_TEXT);
  });

  it("Image visible if source exists", () => {
    cy.get(getDataCy(HEADER_CY)).find("img").should("be.visible");
  });

});
