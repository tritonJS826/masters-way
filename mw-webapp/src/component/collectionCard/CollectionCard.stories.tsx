import type {StoryObj} from "@storybook/react";
import {CollectionCard} from "src/component/collectionCard/CollectionCard";
import {Language} from "src/globalStore/LanguageStore";

const meta = {
  title: "CollectionCard",
  component: CollectionCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClick: () => {},
    isActive: false,
    collectionTitle: "Test collection",
    collectionsAmount: 5,
    language: Language.ENGLISH,
    collectionAmountTitle: "Ways:",
  },
  render: (args) => <CollectionCard {...args} />,
};
