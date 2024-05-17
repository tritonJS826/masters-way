import type {StoryObj} from "@storybook/react";
import {WayCollectionCard} from "src/component/wayCollectionCard/WayCollectionCard";
import {Language} from "src/globalStore/LanguageStore";

const meta = {
  title: "WayCollectionCard",
  component: WayCollectionCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {isActive: false, collectionTitle: "Test collection", collectionWaysAmount: 5, language: Language.ENGLISH},
  render: (args) => (
    <WayCollectionCard {...args} />
  ),
};

