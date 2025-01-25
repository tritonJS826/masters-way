import {render, screen} from "@testing-library/react";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";

const CHILDRENS_TEXT = ["Example text 1", "Example text 2", "Example text 3"];
const VERTICAL_CONTAINER = "vertical-container";

/**
 * Render VerticalContainer
 */
const renderVerticalContainer = () => {
  return render(
    <VerticalContainer dataCy={VERTICAL_CONTAINER}>
      {CHILDRENS_TEXT.map((text, index) => (
        <div key={index}>
          {text}
        </div>
      ))}
    </VerticalContainer>,
  );
};

describe("VerticalContainer component", () => {
  it("should apply default styles", () => {
    renderVerticalContainer();

    const container = screen.getByTestId(VERTICAL_CONTAINER);

    expect(container).toHaveStyle("display: flex");
    expect(container).toHaveStyle("flex-direction: column");
  });

  it("should render children in correct order", () => {
    renderVerticalContainer();

    const container = screen.getByTestId(VERTICAL_CONTAINER);
    const children = container.children;

    CHILDRENS_TEXT.forEach((text, index) => {
      expect(children[index]).toHaveTextContent(text);
    });
  });
});
