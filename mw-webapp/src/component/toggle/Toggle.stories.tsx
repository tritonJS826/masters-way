import type {StoryObj} from "@storybook/react";
import {Toggle} from "src/component/toggle/Toggle";

const meta = {
  title: "Toggle",
  component: Toggle,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {onChange: () => {}}};

export const withDefaultCheck: Story = {
  args: {
    className: "custom-class",
    isDefaultChecked: true,
    onChange: () => {},
  },
};
