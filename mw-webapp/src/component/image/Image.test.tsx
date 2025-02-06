import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import logo from "src/assets/mastersWayLogo.svg";
import {LOGO_TEXT} from "src/component/header/Header";
import {Image} from "src/component/image/Image";
import {MODAL_CY} from "src/component/modal/Modal.test";

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
  it("image component should be visible", () => {
    render(createTestImage({src: logo}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    expect(image).toBeInTheDocument();
    expect(image).toBeVisible();
  });

  it("displays the alt text if the image is not displayed", () => {
    render(createTestImage({src: WRONG_SRC}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    expect(image).toHaveAttribute("alt", LOGO_TEXT);
  });

  it("should enlarge the image on click if isZoomable is true", () => {
    const user = userEvent.setup();
    render(createTestImage({src: logo}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    act (async () => await user.click(image));
    const zoomedImage = screen.getByTestId(IMAGE_CY.dataCy);
    expect(zoomedImage).toBeVisible();
  });
});
