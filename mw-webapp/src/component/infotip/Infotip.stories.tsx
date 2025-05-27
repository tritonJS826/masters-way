import {Meta, StoryObj} from "@storybook/react";
import {Infotip} from "src/component/infotip/Infotip";

const meta: Meta<typeof Infotip> = {
  title: "Infotip",
  component: Infotip,
  tags: ["autodocs"],
  parameters: {layout: "centered"},
};

export default meta;

type Story = StoryObj<typeof Infotip>;

export const Default: Story = {
  args: {
    className: "custom-infotip-class",
    content: "This is helpful information about this feature.",
  },
};
