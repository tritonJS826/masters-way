import type {StoryObj} from "@storybook/react";
import {Tag, TagType} from "src/component/tag/Tag";

const meta = {
  title: "Tag",
  component: Tag,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {tagName: "Tag super tag", type: TagType.BASIC_TAG}};

