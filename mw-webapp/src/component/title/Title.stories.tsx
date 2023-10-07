import type {StoryObj} from "@storybook/react";
import {HeadingLevel, Title} from "src/component/title/Title";

const meta = {
  title: "Title",
  component: Title,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {level: HeadingLevel.h1, className: "h1-title", text: "Heading level 1"}};

export const h2: Story = {args: {level: HeadingLevel.h2, className: "h2-title", text: "Heading level 2"}};

