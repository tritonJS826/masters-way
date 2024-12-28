import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {TrainingCard} from "src/component/trainingCard/TrainingCard";
import {UserPlain} from "src/model/businessModel/User";
import {TrainingPreview} from "src/model/businessModelPreview/TrainingPreview";

const meta = {
  title: "TrainingCard",
  component: TrainingCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultTrainingOwner: UserPlain = {
  uuid: "user1",
  name: "Ekaterina Ver",
  email: "ekaterina@gmail.com",
  description: "developer",
  createdAt: new Date(),
  imageUrl: "",
  isMentor: false,
};

const REPEAT_TEN = 10;

const defaultTrainingPreview: TrainingPreview = {
  uuid: "1",
  name: "Way's name Way's name Way's name Way's name Way's name",
  isPrivate: false,
  trainingTags: [
    {
      uuid: "1",
      name: "IT",
    },
    {
      uuid: "2",
      name: "Development",
    },
    {
      uuid: "3",
      name: "Web",
    },
    {
      uuid: "4",
      name: "Web",
    },
    {
      uuid: "5",
      name: "Web",
    },
  ],
  createdAt: new Date("2024-02-11"),
  favoriteForUsersAmount: 5,
  description: "It's my own training, and I'm very happy".repeat(REPEAT_TEN),
  updatedAt: new Date("2024-02-11"),
  mentors: [
    {
      uuid: "user2",
      name: "Victor",
      email: "emailVictor@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      imageUrl: "",
      isMentor: false,
    },
    {
      uuid: "user3",
      name: "Ekaterina Ver",
      email: "email@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      imageUrl: "",
      isMentor: false,
    },
  ],
  owner: defaultTrainingOwner,
  studentIds: ["00000000-0000-0000-0000-00000000001", "00000000-0000-0000-0000-00000000002"],
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

