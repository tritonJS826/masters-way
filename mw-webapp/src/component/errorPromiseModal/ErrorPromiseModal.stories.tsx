import {Meta, StoryObj} from "@storybook/react";
import {ErrorPromiseModal} from "src/component/errorPromiseModal/ErrorPromiseModal";

const meta: Meta<typeof ErrorPromiseModal> = {
  title: "ErrorPromiseModal",
  component: ErrorPromiseModal,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ErrorPromiseModal>;

export const Default: Story = {
  args: {
    isErrorCatched: true,
    errorMessage: "An unexpected error occurred while processing your request.",
    okText: "OK",
  },
};

