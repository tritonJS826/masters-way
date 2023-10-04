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

const defaultTrigger = (
  <button>
    Click me!
  </button>
);

const defaultContent = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
  </div>
);

export const Default: Story = {
  args: {
    trigger: defaultTrigger,
    content: defaultContent,
  },
};

export const Opened: Story = {
  args: {
    trigger: defaultTrigger,
    content: defaultContent,
    open: true,
  },
};
