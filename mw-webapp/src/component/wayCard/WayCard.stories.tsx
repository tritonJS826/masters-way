import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {WayCard} from "src/component/wayCard/WayCard";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";
import {WayPreview} from "src/model/businessModelPreview/WayPreview";

const meta = {
  title: "WayCard",
  component: WayCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultWayOwner: UserPreview = {
  uuid: "user1",
  name: "Ekaterina Ver",
  email: "ekaterina@gmail.com",
  description: "developer",
  createdAt: new Date(),
  customWayCollections: [],
  favoriteForUserUuids: [],
  favoriteUserUuids: [],
  favoriteWays: [],
  mentoringWays: [],
  ownWays: ["1"],
  tags: [],
  imageUrl: "",
  isMentor: false,
  wayRequests: [],
};

const defaultWayPreview: WayPreview = {
  uuid: "1",
  name: "Way's name Way's name Way's name Way's name Way's name",
  wayTags: ["IT", "Development", "Web", "IT", "Development", "Web"],
  copiedFromWayUuid: "",
  createdAt: new Date("2024-02-11"),
  dayReportUuids: [],
  estimationTime: 0,
  favoriteForUserUuids: ["1", "2", "3"],
  formerMentorUuids: [],
  goalDescription: "It's my own goal, and I'm very happy. It's my own goal, and I'm very happy, I'm very happy, I'm very happy",
  isCompleted: false,
  jobTags: ["Coding", "Reding", "Pair Programming"],
  lastUpdate: new Date("2024-02-11"),
  mentorRequests: [],
  mentors: [
    {
      uuid: "user2",
      name: "Victor",
      email: "emailVictor@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      customWayCollections: [],
      favoriteForUserUuids: [],
      favoriteUserUuids: [],
      favoriteWays: [],
      mentoringWays: [],
      ownWays: ["1"],
      tags: [],
      imageUrl: "",
      isMentor: false,
      wayRequests: [],
    },
    {
      uuid: "user3",
      name: "Ekaterina",
      email: "email@gmail.com",
      description: "developerMentor",
      createdAt: new Date(),
      customWayCollections: [],
      favoriteForUserUuids: [],
      favoriteUserUuids: [],
      favoriteWays: [],
      mentoringWays: [],
      ownWays: ["1"],
      tags: [],
      imageUrl: "",
      isMentor: false,
      wayRequests: [],
    },
  ],
  metricsStringified: [
    "{\"uuid\":\"23\",\"description\":\"tune firebase\",\"isDone\":false,\"doneDate\":1705871133349}",
    "{\"uuid\":\"24\",\"description\":\"reading documentation\",\"isDone\":true,\"doneDate\":1705871046078}",
  ],
  owner: defaultWayOwner,
};

export const Default: Story = {
  args: {wayPreview: defaultWayPreview},
  render: (args) => (
    <BrowserRouter>
      <WayCard {...args} />
    </BrowserRouter>
  ),
};

