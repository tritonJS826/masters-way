import type {StoryObj} from "@storybook/react";
import {Checkbox} from "src/component/checkbox/Сheckbox";

const meta = {
  title: "Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultLabel = "please check it";

export const Default: Story = {
  args: {
    className: "customClass",
    id: "id1",
    label: defaultLabel,
    name: "name",
    value: "value",
  },
};

export const DefaultChecked: Story = {
  args: {
    id: "id1",
    label: defaultLabel,
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    id: "id1",
    label: defaultLabel,
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    id: "id1",
    label: defaultLabel,
    required: true,
  },
};
