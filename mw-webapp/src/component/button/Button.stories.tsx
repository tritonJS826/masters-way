import type {StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";
import styles from "src/component/button/Button.module.scss";

const meta = {
  title: "Button",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "Button",
    onClick: () => {},
    className: styles.buttonSmall,
  },
};

export const Large: Story = {
  args: {
    value: "Button",
    onClick: () => {},
    className: styles.buttonLarge,
  },
};

export const Submit: Story = {
  args: {
    value: "Submit",
    onClick: () => {},
    className: styles.buttonSmall,
  },
};

