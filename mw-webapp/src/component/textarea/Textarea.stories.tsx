import {StoryObj} from "@storybook/react";
import {Textarea} from "src/component/textarea/Textarea";

const meta = {
  title: "Textarea",
  component: Textarea,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const withProperties: Story = {
  args: {
    defaultValue: "Default textarea value",
    onChange: () => {},
    placeholder: "Some placeholder to textarea",
    className: "customClassName",
    rows: 5,
  },
};
