import {Button} from "./Button";
import type {StoryObj} from "@storybook/react";

const meta = {
  title: "Button",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {value: "Button", onClick: () => {}}};

export const Submit: Story = {args: {value: "Submit", onClick: () => {}}};

