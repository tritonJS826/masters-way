import type {StoryObj} from "@storybook/react";
import {renderViewCardOption, renderViewTableOption, ViewSwitcher} from "src/component/viewSwitcher/ViewSwitcher";
import {View} from "src/utils/LocalStorageWorker";

const meta = {
  title: "ViewSwitcher",
  component: ViewSwitcher,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  renderViewCardOption("Grid View"),
  renderViewTableOption("Table View"),
];

export const Default: Story = {
  args: {
    view: View.Card,
    setView: () => {},
    options,
  },
};

export const ListView: Story = {
  args: {
    view: View.Table,
    setView: () => {},
    options,
  },
};
