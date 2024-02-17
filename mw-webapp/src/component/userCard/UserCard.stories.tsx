import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {UserCard} from "src/component/userCard/UserCard";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

const meta = {
  title: "UserCard",
  component: UserCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultUser: UserPreview = {
  uuid: "user1",
  name: "Ekaterina Veretennikova",
  email: "ekaterina@gmail.com",
  description: "front-end developer",
  createdAt: new Date(),
  customWayCollections: [],
  favoriteForUserUuids: [],
  favoriteUserUuids: [],
  favoriteWays: ["1", "2"],
  mentoringWays: [],
  ownWays: ["1"],
  imageUrl: "",
  isMentor: true,
  tags: [],
  wayRequests: [],
};

export const Default: Story = {
  args: {userPreview: defaultUser},
  render: (args) => (
    <BrowserRouter>
      <UserCard {...args} />
    </BrowserRouter>
  ),
};

