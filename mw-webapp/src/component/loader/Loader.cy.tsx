import {Loader} from "src/component/loader/Loader";
import {Theme} from "src/globalStore/ThemeStore";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const LOADER_CY = "loader";
const ALT_TEXT = "Master's way";

describe("Loader component", () => {
  beforeEach(() => {
    cy.mount(
      <Loader
        theme={Theme.DARK}
        dataCy={LOADER_CY}
        isAbsolute
      />,
    );
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
