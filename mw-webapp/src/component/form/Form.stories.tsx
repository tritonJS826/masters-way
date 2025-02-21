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
    onSubmit: () => {},
    formFields: [
      {
        id: 0,
        label: "UserName:",
        name: "Name",
        placeholder: "Viktar Veratsennikau",
        value: "",
      },
      {
        id: 1,
        label: "UserCity:",
        name: "City",
        placeholder: "Georgia",
        value: "",
      },
    ],
    submitButtonValue: "Submit",
    formTitle: "Form title",
    formDescription: "Form description",
  },
};
