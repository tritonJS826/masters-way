import type {StoryObj} from "@storybook/react";
import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";

const meta = {
  title: "Button",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Button",
    onClick: () => {},
  },
};

export const PrimaryButton: Story = {
  args: {
    value: "Primary button",
    onClick: () => {},
    buttonType: ButtonType.PRIMARY,
  },
};
export const SecondaryButton: Story = {
  args: {
    value: "Secondary button",
    onClick: () => {},
    buttonType: ButtonType.SECONDARY,
  },
};

export const IconButton: Story = {
  args: {
    icon: (
      <Icon
        size={IconSize.SMALL}
        name="PlusIcon"
      />
    ),
    onClick: () => {},
    buttonType: ButtonType.ICON_BUTTON,
  },
};
