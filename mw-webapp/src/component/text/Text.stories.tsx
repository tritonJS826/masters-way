import {Meta, StoryObj} from "@storybook/react";
import {Text} from "src/component/text/Text";

const meta = {
  title: "Text",
  component: Text,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextClear: Story = {
  args: {
    text: "Component Text",
    variant: "clear",
  },
};

export const TextOutline: Story = {
  args: {
    text: "Component Text",
    variant: "outline",
  },
};
