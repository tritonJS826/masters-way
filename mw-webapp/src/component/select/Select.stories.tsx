import type {StoryObj} from "@storybook/react";
import {Select} from "src/component/select/Select";

const meta = {
  title: "Select",
  component: Select,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const options = [
  {id: "1", value: "minsk", text: "minsk"},
  {id: "2", value: "moscow", text: "moscow"},
];
export const Default: Story = {
  args: {
    onChange: () => {},
    label: "city",
    defaultValue: "cities",
    name: "",
    options,
  },
};
