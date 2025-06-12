import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {TestCard} from "src/component/testCard/TestCard";
import {TestPreview} from "src/model/businessModelPreview/TestPreview";

const meta = {
  title: "TestCard",
  component: TestCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const REPEAT_TEN = 10;

const defaultTestPreview: TestPreview = {
  uuid: "1",
  name: "Way's name Way's name Way's name Way's name Way's name",
  ownerUuid: "123",
  createdAt: new Date("2024-02-11"),
  description: "It's my own test, and I'm very happy".repeat(REPEAT_TEN),
  updatedAt: new Date("2024-02-11"),
};

export const Default: Story = {
  args: {
    testPreview: defaultTestPreview,
    createdAtTooltip: "Created at:",
    updatedAtTooltip: "Updated at:",
  },
  render: (args) => (
    <BrowserRouter>
      <TestCard {...args} />
    </BrowserRouter>
  ),
};
