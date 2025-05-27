
import {Meta, StoryObj} from "@storybook/react";
import {HorizontalGridContainer} from "src/component/horizontalGridContainer/HorizontalGridContainer";

const meta: Meta<typeof HorizontalGridContainer> = {
  title: "HorizontalGridContainer",
  component: HorizontalGridContainer,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HorizontalGridContainer>;

export const Default: Story = {
  args: {
    children: (
      <div>
        Hello
      </div>
    ),
  },
};
