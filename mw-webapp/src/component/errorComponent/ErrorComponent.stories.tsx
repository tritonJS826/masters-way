import {Meta, StoryObj} from "@storybook/react";
import {ErrorComponent} from "src/component/errorComponent/ErrorComponent";

const meta: Meta<typeof ErrorComponent> = {
  title: "ErrorComponent",
  component: ErrorComponent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ErrorComponent>;

export const Default: Story = {
  args: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again later.",
  },
};
