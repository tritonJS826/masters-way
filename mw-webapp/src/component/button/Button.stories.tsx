import type {StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";

const meta = {
  title: "Button",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Button",
    onClick: () => {},
  },
};

export const Submit: Story = {
  args: {
    value: "Submit",
    onClick: () => {},
  },
};
