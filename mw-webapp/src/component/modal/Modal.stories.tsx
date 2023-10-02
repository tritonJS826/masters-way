import type {StoryObj} from "@storybook/react";
import {Modal} from "src/component/modal/Modal";

const meta = {
  title: "Modal",
  component: Modal,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: (
      <button>
        Click me!
      </button>
    ),
    content: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam assumenda autem culpa distinctio, dolor ex fugiat
        illum ipsum magnam molestiae neque non officia quidem, veritatis, vitae! Delectus minus nostrum quam.
      </div>
    ),
  },
};
