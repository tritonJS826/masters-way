import {Meta, StoryObj} from "@storybook/react";
import {EmojiPickerPopover} from "src/component/emojiPickerPopover/EmojiPickerPopover";

const meta: Meta<typeof EmojiPickerPopover> = {
  title: "EmojiPickerPopover",
  component: EmojiPickerPopover,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EmojiPickerPopover>;

export const Default: Story = {
  args: {
    onEmojiSelect: () => {
    },
  },
};
