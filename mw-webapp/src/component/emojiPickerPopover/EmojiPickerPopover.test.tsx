import {act, render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {EmojiPickerPopover} from "src/component/emojiPickerPopover/EmojiPickerPopover";
import {describe, expect, it, vi} from "vitest";

describe("EmojiPickerPopover", () => {

  it("should render emoji picker button", () => {
    const onEmojiSelect = vi.fn();
    render(<EmojiPickerPopover onEmojiSelect={onEmojiSelect} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should open dialog when clicking the emoji button", async () => {
    const onEmojiSelect = vi.fn();
    render(<EmojiPickerPopover onEmojiSelect={onEmojiSelect} />);
    const emojiButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.click(emojiButton);
    });

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  it("should call onEmojiSelect when selecting an emoji", async () => {
    const onEmojiSelect = vi.fn();
    render(<EmojiPickerPopover onEmojiSelect={onEmojiSelect} />);

    const emojiButton = screen.getByRole("button");
    await act(async () => {
      await userEvent.click(emojiButton);
    });

    const mockEmoji = {native: "😀"};
    const picker = screen.getByRole("dialog");
    await act(async () => {
      await userEvent.click(picker);
    });
    onEmojiSelect(mockEmoji);

    expect(onEmojiSelect).toHaveBeenCalledWith(mockEmoji);
  });

});
