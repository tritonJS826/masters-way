import type {StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";

export default meta = {
  title: "Button",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {args: {value: "Button", onClick: () => {}}};

export const Submit: Story = {args: {value: "Submit", onClick: () => {}}};

