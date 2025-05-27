import {Meta, StoryObj} from "@storybook/react";
import {AdvantageItem} from "src/component/advantageItem/AdvantageItem";

const meta: Meta<typeof AdvantageItem> = {
  title: "AdvantageItem",
  component: AdvantageItem,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof AdvantageItem>;

export const Default: Story = {
  args: {
    title: "Fast Delivery",
    description: "Get your products delivered in less than 24 hours!",
    iconName: "ClockIcon",
  },
};
