import {Meta, StoryObj} from "@storybook/react";
import {AreaChart} from "src/component/chart/AreaChart";

const meta: Meta<typeof AreaChart> = {
  title: "AreaChart",
  component: AreaChart,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    points: [
      {date: new Date("2021-01-01"), value: 10},
      {date: new Date("2021-01-02"), value: 20},
      {date: new Date("2021-01-03"), value: 30},
    ],
  },
};

export const ManyPoints: Story = {
  args: {
    points: [
      {date: new Date("2021-01-01"), value: 10},
      {date: new Date("2021-01-02"), value: 0},
      {date: new Date("2021-01-03"), value: 15},
      {date: new Date("2021-01-01"), value: 1},
      {date: new Date("2021-01-02"), value: 5},
      {date: new Date("2021-01-03"), value: 8},
      {date: new Date("2021-01-01"), value: 10},
      {date: new Date("2021-01-02"), value: 0},
      {date: new Date("2021-01-03"), value: 15},
      {date: new Date("2021-01-01"), value: 1},
      {date: new Date("2021-01-02"), value: 5},
      {date: new Date("2021-01-03"), value: 8},
    ],
  },
};
