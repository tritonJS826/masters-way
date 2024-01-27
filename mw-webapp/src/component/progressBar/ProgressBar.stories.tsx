import type {StoryObj} from "@storybook/react";
import {ProgressBar} from "src/component/progressBar/ProgressBar";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {percentage: 50, text: "story"},
  render: (args) => (
    <ProgressBar {...args} />
  ),
};
