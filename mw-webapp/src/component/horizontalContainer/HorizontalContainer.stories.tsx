import {Meta, StoryObj} from "@storybook/react";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";

const meta: Meta<typeof HorizontalContainer> = {
  title: "HorizontalContainer",
  component: HorizontalContainer,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HorizontalContainer>;

export const Default: Story = {
  args: {
    onClick: () => {},
    children: (
      <div>
        Hello
      </div>
    ),
  },
};
