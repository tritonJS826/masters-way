import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {Button, ButtonType} from "src/component/button/Button";
import {MenuItemLink, Sidebar} from "src/component/sidebar/Sidebar";

const meta = {
  title: "Sidebar",
  component: Sidebar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const linkList: MenuItemLink[] = [
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
    bottomChildren: <>
      <Button
        onClick={() => {}}
        value="Bottom button"
        buttonType={ButtonType.SECONDARY}
      />
    </>,
  },
  render: (args) => (
    <BrowserRouter>
      <Sidebar {...args} />
    </BrowserRouter>
  ),
};
