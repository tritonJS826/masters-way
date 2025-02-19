import type {StoryObj} from "@storybook/react";
import {
  getDefaultRightValueLabel,
  ProgressBar,
} from "src/component/progressBar/ProgressBar";

const meta = {
  title: "ProgressBar",
  component: ProgressBar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
    getRightValueLabel: getDefaultRightValueLabel,
  },
  render: (args) => (
    <div style={{width: 500}}>
      <ProgressBar {...args} />
    </div>
  ),
};
