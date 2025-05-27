import {Meta, StoryObj} from "@storybook/react";
import {EditableText} from "src/component/editableText/EditableText";

const meta: Meta<typeof EditableText> = {
  title: "EditableText",
  component: EditableText,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof EditableText>;

export const Default: Story = {
  args: {
    value: "Click to edit this text",
    onChangeFinish: () => {},
    className: "custom class name",
    placeholder: "Enter text here...",
  },
};

export const EmptyText: Story = {
  args: {
    value: "",
    onChangeFinish: () => {},
    placeholder: "This is a placeholder",
  },
};

export const NumberInput: Story = {
  args: {
    value: 42,
    type: "number",
    min: 0,
    max: 100,
    onChangeFinish: () => {},
    placeholder: "Enter a number",
  },
};

export const NonEditable: Story = {
  args: {
    value: "This text cannot be edited",
    onChangeFinish: () => {},
    placeholder: "Placeholder",
    isEditable: false,
  },
};
