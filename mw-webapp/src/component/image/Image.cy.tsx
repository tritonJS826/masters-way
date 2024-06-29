import logo from "src/assets/mastersWayLogo.svg";
import {LOGO_TEXT} from "src/component/header/Header";
import {Image} from "src/component/image/Image";
import {MODAL_CY} from "src/component/modal/Modal.cy";
import {getDataCy} from "src/utils/cyTesting/getDataCy";

const IMAGE_CY = {
  dataCy: "image",
  ...MODAL_CY,
};

const WRONG_SRC = "./wrong.src";

/**
 * CreateTestImageProps props
 */
export interface createTestImageProps {

  /**
   * Image's src
   */
  src: string;
}

/**
 * Create test input component
 */
const createTestImage = (props: createTestImageProps) => {
  return (
    <Image
      src={props.src}
      alt={LOGO_TEXT}
      isZoomable={true}
      cy={IMAGE_CY}
    />
  );
};

describe("Image component", () => {
  it("should render image component correctly", () => {
    cy.mount(createTestImage({src: logo}));
    cy.get(getDataCy(IMAGE_CY.dataCy)).should("exist");
  });

  it("image component should be visible", () => {
    cy.mount(createTestImage({src: logo}));
    cy.get(getDataCy(IMAGE_CY.dataCy)).should("be.visible");
  });

  it("displays the alt text if the image is not displayed", () => {
    cy.mount(createTestImage({src: WRONG_SRC}));
    cy.get(getDataCy(IMAGE_CY.dataCy))
      .invoke("attr", "alt")
      .should("exist")
      .and("not.be.empty")
      .should("eq", LOGO_TEXT);
  });

  it("should enlarge the image on click if isZoomable is true", () => {
    cy.mount(createTestImage({src: logo}));
    cy.get(getDataCy(IMAGE_CY.dataCy)).click();
    cy.get(getDataCy(IMAGE_CY.dataCyContent.dataCyContent)).should("be.visible");
  });
});
