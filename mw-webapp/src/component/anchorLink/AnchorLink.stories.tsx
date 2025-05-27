import {Meta, StoryObj} from "@storybook/react";
import {AnchorLink} from "src/component/anchorLink/AnchorLink";

const meta: Meta<typeof AnchorLink> = {
  title: "AnchorLink",
  component: AnchorLink,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AnchorLink>;

export const Default: Story = {
  args: {
    path: "section1",
    children: "Go to Section 1",
  },
};
