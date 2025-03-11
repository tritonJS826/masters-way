import {render, screen} from "@testing-library/react";
import {Text} from "src/component/text/Text";

const TEXT_CY = "text";
const TEXT_VALUE = "Hello World";

/**
 * Render Text component
 */
const renderText = (text?: string) => {
  render(
    <Text
      text={text ? text : ""}
      cy={TEXT_CY}
    />,
  );
};

describe("Text component", () => {
  it("should render text when it is provided", () => {
    renderText(TEXT_VALUE);
    expect(screen.getByText(TEXT_VALUE)).toBeInTheDocument();
  });

  it("should not render anything when text is empty", () => {
    renderText();
    expect(screen.getByTestId(TEXT_CY)).toBeEmptyDOMElement();
  });
});
