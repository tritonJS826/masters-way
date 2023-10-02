import type {StoryObj} from "@storybook/react";
import {Image} from "src/component/image/Image";

const meta = {
  tile: "Image",
  component: Image,
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
