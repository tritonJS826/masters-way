import {Meta, StoryObj} from "@storybook/react";
import {ReportItemCard} from "src/component/reportItemCard/ReportItemCard";

const meta: Meta<typeof ReportItemCard> = {
  title: "ReportItemCard",
  component: ReportItemCard,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ReportItemCard>;

export const Default: Story = {
  args: {
    title: "Daily Tasks",
    infotipText: "This section contains your daily tasks and activities.",
  },
};
