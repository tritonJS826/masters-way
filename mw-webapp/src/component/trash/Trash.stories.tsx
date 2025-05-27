import {Meta, StoryObj} from "@storybook/react";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Trash} from "src/component/trash/Trash";

const meta: Meta<typeof Trash> = {
  title: "Trash",
  component: Trash,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Trash>;

export const Default: Story = {
  args: {
    tooltipContent: "Delete item",
    tooltipPosition: PositionTooltip.TOP,
    confirmContent: "Are you sure you want to delete this item?",
    onOk: () => {},
    okText: "Delete",
    cancelText: "Cancel",
  },
};
