import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {TopicCard} from "src/component/topicCard/TopicCard";

const meta = {
  title: "TopicCard",
  component: TopicCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isEditable: true,
    trainingUuid: "1",
    createdAtText: "2024-02-11",
    emptyTitle: "No topics",
    externalLinkTooltip: "Open in new tab",
    practiceMaterialTooltip: "Practice material",
    theoryMaterialTooltip: "Theory material",
    topic: {
      uuid: "1",
      name: "Topic name",
      trainingUuid: "1",
      createdAt: new Date("2024-02-11"),
      children: [],
      order: 1,
      parentUuid: null,
      practiceMaterialAmount: 1,
      theoryMaterialAmount: 1,
      updateName: () => {},
    },
  },
  render: (args) => (
    <BrowserRouter>
      <TopicCard {...args} />
    </BrowserRouter>
  ),
};
