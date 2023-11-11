import type {StoryObj} from "@storybook/react";
import {InProgress} from "src/component/inProgress/InProgress";

const meta = {
  title: "InProgress",
  component: InProgress,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <InProgress />
    </div>
  ),
};

export const LimitedByParent: Story = {
  render: () => (
    <div style={{position: "relative", width: "100px", height: "100px"}}>
      <InProgress />
    </div>
  ),
};
