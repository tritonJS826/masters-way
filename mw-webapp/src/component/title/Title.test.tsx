import {act} from "react-dom/test-utils";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {HeadingLevel, Title} from "src/component/title/Title";
import {describe, expect, it, vi} from "vitest";

const TITLE_CONTENT = "Title";
const TITLE = "title";
const TITLE_CY = {dataCyTitleContainer: "title"};
const TITLE_LEVEL = HeadingLevel.h1;
const IS_EDITABLE = true;
const ADDITIONAL_CONTENT = "additional";
const TITLE_LEVEL_NUMBER = 1;

describe("Title component", () => {

  /**
   * Renders Title component
   */
  const renderTitle = (onChangeFinish = vi.fn()) => {
    render(
      <Title
        text={TITLE_CONTENT}
        level={TITLE_LEVEL}
        cy={TITLE_CY}
        isEditable={IS_EDITABLE}
        onChangeFinish={onChangeFinish}
        placeholder=""
      />,
    );
  };

  it("should render the correct value", () => {
    renderTitle();
    const titleContainer = screen.getByTestId(TITLE);

    expect(titleContainer).toHaveTextContent(TITLE_CONTENT);
  });

  it("should render the appropriate heading level (check semantics)", () => {
    renderTitle();
    expect(screen.getByRole("heading", {level: TITLE_LEVEL_NUMBER})).toBeInTheDocument();
  });

  it("should change to input on double-click and trigger onChangeFinish", async () => {
    const user = userEvent.setup();
    const mockOnChangeFinish = vi.fn();

    renderTitle(mockOnChangeFinish);

    const titleContainer = screen.getByTestId(TITLE);
    await act(async () => {
      await user.dblClick(titleContainer);
    });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await act(async () => {
      await user.type(input, ADDITIONAL_CONTENT);
      await user.keyboard("{Enter}");
    });

    expect(screen.getByTestId(TITLE)).toHaveTextContent(
      TITLE_CONTENT + ADDITIONAL_CONTENT,
    );
    expect(mockOnChangeFinish).toHaveBeenCalled();
  });
});
