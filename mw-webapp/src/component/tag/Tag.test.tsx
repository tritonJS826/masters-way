import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Tag, TagType} from "src/component/tag/Tag";
import {vi} from "vitest";

const TAG_CONTENT = "tag super tag";

/**
 * Renders Tag component
 */
const renderTag = (type: TagType, onDelete?: (tagName: string) => void) => {
  return render(
    <Tag
      tagName={TAG_CONTENT}
      type={type}
      isDeletable={!!onDelete}
      onDelete={onDelete}
    />,
  );
};

describe("Tag component", () => {
  it("should render a primary tag", () => {
    renderTag(TagType.PRIMARY_TAG);
    const tag = screen.getByRole("note");

    expect(tag).toBeInTheDocument();
    expect(tag).toHaveTextContent(TAG_CONTENT);
  });

  it("should render a card tag", () => {
    renderTag(TagType.CARD_TAG);
    const tag = screen.getByRole("note");

    expect(tag).toHaveTextContent(TAG_CONTENT);
  });

  it("should delete a primary tag", async () => {
    const user = userEvent.setup();
    const deleteCallback = vi.fn();

    renderTag(TagType.PRIMARY_TAG, deleteCallback);
    const deleteButton = screen.getByRole("button");
    await user.click(deleteButton);

    expect(deleteCallback).toHaveBeenCalledWith(TAG_CONTENT);
  });
});
