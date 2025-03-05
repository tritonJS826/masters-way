import {render, screen} from "@testing-library/react";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";

const CHILDRENS_TEXT = [
  "Example text 1,Example text 1,Example text 1,Example text 1,Example text 1,Example text 1,Example text 1",
  "Example text 2,Example text 2,Example text 2,Example text 2,Example text 2,Example text 2,Example text 2",
  "Example text 3,Example text 3,Example text 3,Example text 3,Example text 3,Example text 3,Example text 3",
];
const SCROLLABLE_BLOCK_TEST_ID = "scrollable-block";
const WIDTH = "150px";
const HEIGHT = "200px";

describe("ScrollableBlock component", () => {
  beforeEach(() => {
    render(
      <ScrollableBlock
        dataCy={SCROLLABLE_BLOCK_TEST_ID}
        height={HEIGHT}
        width={WIDTH}
      >
        {CHILDRENS_TEXT.map((text, index) => (
          <div key={index}>
            {text}
          </div>
        ))}
      </ScrollableBlock>,
    );
  });

  it("should render ScrollableBlock correctly", () => {
    const scrollableBlock = screen.getByTestId(SCROLLABLE_BLOCK_TEST_ID);
    expect(scrollableBlock).toBeInTheDocument();
  });

  it("should have correct dimensions and allow scrolling", () => {
    const scrollableBlock = screen.getByTestId(SCROLLABLE_BLOCK_TEST_ID);
    expect(scrollableBlock).toHaveStyle({width: WIDTH, height: HEIGHT});
    expect(scrollableBlock).toHaveStyle({overflow: "auto"});
  });
});
