import type {StoryObj} from "@storybook/react";
import {Input} from "src/component/input/Input";
import {InputMode} from "src/component/input/InputMode";

const meta = {
  title: "Input",
  component: Input,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    type: "text",
    placeholder: "Placeholder text",
    inputMode: InputMode.text,
    onChange: () => {},
  },
};
