import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const HORIZONTAL_CONTAINER_CY = "HorizontalContainer";

describe("HorizontalContainer", () => {

  beforeEach(() => {
    act(() => {
      render(
        <HorizontalContainer dataCy={HORIZONTAL_CONTAINER_CY}>
          {CHILDRENS_TEXT.map((text, index) => (
            <div key={index}>
              {text}
            </div>
          ))}
        </HorizontalContainer>,
      );
    });
  });

  it("should render HorizontalContainer correctly", () => {
    expect(screen.getByTestId(HORIZONTAL_CONTAINER_CY)).toBeInTheDocument();
  });

  it("should applies default styles", () => {
    expect(screen.getByTestId(HORIZONTAL_CONTAINER_CY)).toHaveStyle("display: flex");
  });

  it("should renders children in correct order", () => {
    CHILDRENS_TEXT.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

});
