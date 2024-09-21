import type {StoryObj} from "@storybook/react";
import {Form} from "src/component/form/Form";

const meta = {
  title: "Form",
  component: Form,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formFields: [
      {
        id: 0,
        label: "UserName:",
        placeholder: "Viktar Veratsennikau",
        value: "",
      },
      {
        id: 1,
        label: "UserCity:",
        placeholder: "Georgia",
        value: "",
      },
    ],
    submitButtonValue: "Submit",
    formTitle: "Form title",
    formDescription: "Form description",
  },
};
