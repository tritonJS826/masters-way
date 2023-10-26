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

export const Default: Story = {args: {content: defaultDescription}};

export const SecondNotice: Story = {
  args: {
    content: defaultDescription,
    duration: 1000,
    type: NotificationType.background,
  },
};

export const InfinityNotice: Story = {
  args: {
    content: defaultDescription,
    duration: 0,
    type: NotificationType.background,
  },
};
