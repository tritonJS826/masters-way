import {BrowserRouter} from "react-router-dom";
import type {StoryObj} from "@storybook/react";
import {UserCard} from "src/component/userCard/UserCard";
import {UserNotSaturatedWay} from "src/model/businessModelPreview/UserNotSaturatedWay";

const meta = {
  title: "UserCard",
  component: UserCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultUser: UserNotSaturatedWay = {
  uuid: "user1",
  name: "Ekaterina Veretennikova",
  email: "ekaterina@gmail.com",
  description: "front-end developer",
  createdAt: new Date(),
  favoriteForUserUuids: [],
  favoriteUserUuids: [],
  favoriteWays: 2,
  mentoringWays: 3,
  ownWays: 1,
  imageUrl: "src/assets/storybook-images/kittens.jpg",
  isMentor: true,
  tags: [],
};

export const Default: Story = {
  args: {userPreview: defaultUser},
  render: (args) => (
    <BrowserRouter>
      <UserCard {...args} />
    </BrowserRouter>
  ),
};

