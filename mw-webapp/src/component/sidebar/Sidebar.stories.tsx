import type {StoryObj} from "@storybook/react";
import {Sidebar} from "src/component/sidebar/Sidebar";

const meta = {
  title: "Sidebar",
  component: Sidebar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <button>
      Open sidebar
    </button>,
    content: <div>
      Sidebar content
    </div>,
  },
  render: (args) => (
    <Sidebar {...args} />
  ),
};
