import type {StoryObj} from "@storybook/react";
import {Notification, NotificationType} from "src/component/notification/Notification";

const meta = {
  title: "Notification",
  component: Notification,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const defaultDescription = (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
  </div>
);

export const Default: Story = {args: {description: defaultDescription}};

export const SecondNotice: Story = {
  args: {
    description: defaultDescription,
    duration: 1000,
    label: "warning",
    type: NotificationType.background,
  },
};

export const InfinityNotice: Story = {
  args: {
    description: defaultDescription,
    duration: 0,
    label: "alert",
    type: NotificationType.background,
  },
};
