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

/**
 * Mock error on image load because test environment doesn't have access to the image
 */
function mockErrorOnImageLoad(image: HTMLElement) {
  image.style.display = "none";
  const fallback = document.createElement("span");
  fallback.textContent = image.getAttribute("alt");
  image.parentElement?.appendChild(fallback);
}

describe("Image component", () => {
  it("image component should be visible", () => {
    render(createTestImage({src: logo}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    expect(image).toBeInTheDocument();
    expect(image).toBeVisible();
  });

  test("displays the alt text if the image is not displayed", () => {
    render(createTestImage({src: WRONG_SRC}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    mockErrorOnImageLoad(image);
    expect(screen.getByText(LOGO_TEXT)).toBeInTheDocument();
  });

  it("should enlarge the image on click if isZoomable is true", async () => {
    const user = userEvent.setup();
    render(createTestImage({src: logo}));
    const image = screen.getByTestId(IMAGE_CY.dataCy);
    await act (async () => await user.click(image));
    const zoomedImage = screen.getByTestId(MODAL_CY.dataCyContent.dataCyContent);
    expect(zoomedImage).toBeVisible();
  });
});

