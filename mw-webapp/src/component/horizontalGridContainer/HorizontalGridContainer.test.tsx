import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const HORIZONTAL_CRID_CONTAINER_CY = "HorizontalGridContainer";

describe("HorizontalGridContainer component", () => {

  beforeEach(() => {
    act(() => {
      render(
        <HorizontalGridContainer dataCy={HORIZONTAL_CRID_CONTAINER_CY}>
          {CHILDRENS_TEXT.map((text, index) => (
            <div key={index}>
              {text}
            </div>
          ))}
        </HorizontalGridContainer>,
      );
    });
  });

  it("should render HorizontalContainer correctly", () => {
    expect(screen.getByTestId(HORIZONTAL_CRID_CONTAINER_CY)).toBeInTheDocument();
  });

  it("should applies default styles", () => {
    expect(screen.getByTestId(HORIZONTAL_CRID_CONTAINER_CY)).toHaveStyle("display: grid");
  });

  it("should renders children in correct order", () => {
    CHILDRENS_TEXT.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

});
