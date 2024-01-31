import type {StoryObj} from "@storybook/react";
import {getDefaultLongValueLabel, ProgressBar} from "src/component/progressBar/ProgressBar";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {value: 50, getValueLabel: getDefaultLongValueLabel},
  render: (args) => (
    <ProgressBar {...args} />
  ),
};
