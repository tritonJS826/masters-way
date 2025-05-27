import {Meta, StoryObj} from "@storybook/react";
import {Icon, IconSize} from "src/component/icon/Icon";

const meta: Meta<typeof Icon> = {
  title: "Icon",
  component: Icon,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "HomeIcon",
    size: IconSize.MEDIUM,
  },
};

export const Small: Story = {
  args: {
    name: "StarIcon",
    size: IconSize.SMALL,
  },
};

export const Medium: Story = {
  args: {
    name: "UserIcon",
    size: IconSize.MEDIUM,
  },
};

export const Big: Story = {
  args: {
    name: "SettingsIcon",
    size: IconSize.BIG,
  },
};
