import type {StoryObj} from "@storybook/react";
import {Button} from "src/component/button/Button";
import {NotificationType} from "src/component/notification/displayNotification";
import {displayNotification} from "src/component/notification/Notification";

const meta = {
  title: "Notification",
  component: Button,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const InfoNotification: Story = {
  args: {
    value: "Trigger notification",
    onClick: () => {
      displayNotification({
        text: "Info Notification",
        type: NotificationType.INFO,
      });
    },
  },
};

export const ErrorNotification: Story = {
  args: {
    value: "Trigger notification",
    onClick: () => {
      displayNotification({
        text: "Error Notification",
        type: NotificationType.ERROR,
      });
    },
  },
};
