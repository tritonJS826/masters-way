import type {StoryObj} from "@storybook/react";
import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";

const meta = {
  title: "WayCollectionCard",
  component: WayCollectionCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {isActive: false, collectionTitle: "Test collection", collectionWaysAmount: 5},
  render: (args) => (
    <WayCollectionCard {...args} />
  ),
};

