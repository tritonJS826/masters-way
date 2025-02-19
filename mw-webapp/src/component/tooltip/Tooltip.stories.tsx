import type {StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";

const meta = {
  title: "Tooltip",
  component: Tooltip,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {content: "Hi, I am tooltip content"},
  render: (args) => (<Tooltip {...args}>
    Hover me
  </Tooltip>),
};

export const LeftPosition: Story = {
  args: {content: "Hi, I am left", position: PositionTooltip.LEFT},
  render: (args) => (<Tooltip {...args}>
    Hover me
  </Tooltip>),
};

export const RightPosition: Story = {
  args: {content: "Hi, I am right", position: PositionTooltip.RIGHT},
  render: (args) => (<Tooltip {...args}>
    Hover me
  </Tooltip>),
};

export const BottomPosition: Story = {
  args: {content: "Hi, I am bottom", position: PositionTooltip.BOTTOM},
  render: (args) => (<Tooltip {...args}>
    Hover me
  </Tooltip>),
};

export const ButtonTooltip: Story = {
  args: {content: "Hi, I am tooltip content"},
  render: (args) => (
    <Tooltip {...args}>
      <Button
        value="Hover me"
        onClick={() => {}}
      />
    </Tooltip>
  ),
};
