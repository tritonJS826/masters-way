import type { StoryObj } from "@storybook/react";
import { Image } from "src/component/image/Image";

export default meta = {
  title: "Image",
  component: Image,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "src/assets/storybook-images/kittens.jpg",
    alt: "Kittens in an attempt to do at least one component correctly",
  },
};
