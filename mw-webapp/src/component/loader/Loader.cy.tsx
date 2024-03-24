import {Loader} from "src/component/loader/Loader";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const LOADER_CY = "loader";
const ALT_TEXT = "Loading image";

describe("Loader component", () => {
  beforeEach(() => {
    cy.mount(<Loader dataCy={LOADER_CY} />);
  });

  it("should render loader component correctly", () => {
    cy.get(getDataCy(LOADER_CY)).should("exist");
  });

  it("should display the loader image", () => {
    cy.get(getDataCy(LOADER_CY)).find("img").should("exist");
  });

  it("loader component should be visible", () => {
    cy.get(getDataCy(LOADER_CY)).should("be.visible");
  });

  it("should have the alt text", () => {
    cy.get(getDataCy(LOADER_CY)).find("img").should("have.attr", "alt", ALT_TEXT);
  });
});
