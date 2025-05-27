import {BrowserRouter} from "react-router-dom";
import {Meta, StoryObj} from "@storybook/react";
import {NotificationBlock} from "src/component/notificationBlock/NotificationBlock";
import {NotificationNature} from "src/component/notificationBlock/notificationItem/NotificationItem";
import {Language} from "src/globalStore/LanguageStore";
import {Notification} from "src/model/businessModel/Notification";
import {LanguageService} from "src/service/LanguageService";

const mockNotifications: Notification[] = [
  {
    uuid: "1",
    description: "Your way has been updated",
    nature: NotificationNature.own_way,
    url: "https://example.com/way/123",
    isRead: false,
    updateIsRead: () => {},
    createdAt: new Date(),
    userUuid: "user-1",
  } as Notification,
  {
    uuid: "2",
    description: "New mentoring way activity",
    nature: NotificationNature.mentoring_way,
    url: "https://example.com/way/456",
    isRead: true,
    updateIsRead: () => {},
    createdAt: new Date(),
    userUuid: "user-2",
  } as Notification,
];

const getTitle = (nature: NotificationNature): string => {
  return LanguageService.notifications.nature[nature][Language.ENGLISH];
};

const meta: Meta<typeof NotificationBlock> = {
  title: "NotificationBlock",
  component: NotificationBlock,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{width: 300, height: 800}}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof NotificationBlock>;

export const Default: Story = {
  args: {
    title: "Notifications",
    notificationList: mockNotifications,
    getTitle,
    isOpen: true,
    isMoreNotificationsExist: true,
    totalNotificationsAmount: 10,
  },
};

export const Empty: Story = {
  args: {
    title: "Notifications",
    notificationList: [],
    isOpen: true,
    getTitle,
    isMoreNotificationsExist: false,
    totalNotificationsAmount: 0,
  },
};
