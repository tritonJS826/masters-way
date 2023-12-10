import type {StoryObj} from "@storybook/react";
import {NavigationLink, Sidebar} from "src/component/sidebar/Sidebar";

const meta = {
  title: "Sidebar",
  component: Sidebar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const linkList: NavigationLink[] = [
  {
    path: "./",
    value: "TestLink 1",
  },
  {
    path: "./",
    value: "TestLink 2",
  },
  {
    path: "./",
    value: "TestLink 3",
  },
  {
    path: "./",
    value: "TestLink 4",
  },
  {
    path: "./",
    value: "TestLink 5",
  },
];

export const Default: Story = {
  args: {
    trigger: <button>
      Open sidebar
    </button>,
    linkList,
  },
  render: (args) => (
    <Sidebar {...args} />
  ),
};
