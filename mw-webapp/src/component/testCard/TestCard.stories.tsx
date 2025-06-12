import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {
  TrainingPreview,
  UserPreview,
} from "src/model/businessModelPreview/TrainingPreview";

const meta = {
  title: "TrainingCard",
  component: TrainingCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultTrainingOwner: UserPreview = {
  uuid: "user1",
  name: "Ekaterina Ver",
  imageUrl: "",
};

const REPEAT_TEN = 10;

const defaultTrainingPreview: TrainingPreview = {
  uuid: "1",
  name: "Way's name Way's name Way's name Way's name Way's name",
  isPrivate: false,
  trainingTags: [
    {name: "IT"},
    {name: "Development"},
    {name: "Web"},
    {name: "Web"},
    {name: "Web"},
  ],
  createdAt: new Date("2024-02-11"),
  favoriteForUsersAmount: 5,
  description: "It's my own training, and I'm very happy".repeat(REPEAT_TEN),
  updatedAt: new Date("2024-02-11"),
  mentors: [
    {
      uuid: "user2",
      name: "Victor",
      imageUrl: "",
    },
    {
      uuid: "user3",
      name: "Ekaterina Ver",
      imageUrl: "",
    },
  ],
  owner: defaultTrainingOwner,
  studentsAmount: 2,
  topicsAmount: 3,
};

export const Default: Story = {
  args: {
    trainingPreview: defaultTrainingPreview,
    createdAtTooltip: "Created at:",
    updatedAtTooltip: "Updated at:",
    likesTooltip: "Amount of likes",
    mentorsText: "Mentors:",
    studentsTooltip: "Student's amount",
  },
  render: (args) => (
    <BrowserRouter>
      <TrainingCard {...args} />
    </BrowserRouter>
  ),
};
