import logo from "src/assets/mastersWayLogo.svg";
import {LOGO_TEXT} from "src/component/header/Header";
import {Image} from "src/component/image/Image";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const IMAGE_CY = "image";

describe("Image component", () => {

  beforeEach(() => {
    cy.mount(
      <Image
        dataCy={IMAGE_CY}
        src={logo}
        alt={LOGO_TEXT}
      />,
    );
  });

  it("should render image component correctly", () => {
    cy.get(getDataCy(IMAGE_CY)).should("exist");
  });

  it("should display a default image if src is not provided", () => {
    cy.get(getDataCy(IMAGE_CY)).should("have.attr", "src").and("not.be.empty");
  });

  it("should display the image with correct alt text", () => {
    cy.get(getDataCy(IMAGE_CY)).should("have.attr", "alt", LOGO_TEXT);
  });

  it("image component should be visible", () => {
    cy.get(getDataCy("image")).should("be.visible");
  });

});
