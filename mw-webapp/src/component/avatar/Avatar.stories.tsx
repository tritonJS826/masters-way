import type {StoryObj} from "@storybook/react";
import {Avatar} from "src/component/avatar/Avatar";

const meta = {
  title: "Avatar",
  component: Avatar,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "src/assets/storybook-images/kittens.jpg",
    alt: "Kittens in an attempt to do at least one component correctly",
  },
};

export const WithNoImage: Story = {
  args: {
    src: null,
    alt: "Kittens in an attempt to do at least one component correctly",
  },
};

export const WithBrokenImage: Story = {
  args: {
    src: "",
    alt: "AA",
  },
};
