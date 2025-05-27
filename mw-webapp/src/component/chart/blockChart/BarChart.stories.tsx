import {Meta, StoryObj} from "@storybook/react";
import {BarChart} from "src/component/chart/blockChart/BarChart";

const meta: Meta<typeof BarChart> = {
  title: "BarChart",
  component: BarChart,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Bar Chart",
    itemStats: [
      {
        label: {
          uuid: "1",
          name: "Frontend Development",
          color: "#FFD700",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 10,
        jobsAmountPercentage: 10,
        time: 10,
        timePercentage: 10,
      },
      {
        label: {
          uuid: "2",
          name: "Backend Development",
          color: "#00FA9A",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 20,
        jobsAmountPercentage: 20,
        time: 20,
        timePercentage: 20,
      },
      {
        label: {
          uuid: "3",
          name: "Testing & QA",
          color: "#FF6347",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 30,
        jobsAmountPercentage: 30,
        time: 30,
        timePercentage: 30,
      },
    ],
  },
};

export const ManyCategories: Story = {
  args: {
    title: "Detailed Task Breakdown",
    itemStats: [
      {
        label: {
          uuid: "1",
          name: "Planning",
          color: "#8A2BE2",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 5,
        jobsAmountPercentage: 8,
        time: 5,
        timePercentage: 8,
      },
      {
        label: {
          uuid: "2",
          name: "Implementation",
          color: "#FFA07A",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 20,
        jobsAmountPercentage: 33,
        time: 20,
        timePercentage: 33,
      },
      {
        label: {
          uuid: "3",
          name: "Testing",
          color: "#40E0D0",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 12,
        jobsAmountPercentage: 20,
        time: 12,
        timePercentage: 20,
      },
      {
        label: {
          uuid: "4",
          name: "Bug Fixes",
          color: "#8B008B",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 8,
        jobsAmountPercentage: 13,
        time: 8,
        timePercentage: 13,
      },
      {
        label: {
          uuid: "5",
          name: "Deployment",
          color: "#FF4500",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 6,
        jobsAmountPercentage: 10,
        time: 6,
        timePercentage: 10,
      },
      {
        label: {
          uuid: "6",
          name: "Monitoring",
          color: "#7FFF00",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 4,
        jobsAmountPercentage: 7,
        time: 4,
        timePercentage: 7,
      },
      {
        label: {
          uuid: "7",
          name: "Maintenance",
          color: "#9932CC",
          description: "",
          updateName: () => {},
          updateDescription: () => {},
          updateColor: () => {},
        },
        jobsAmount: 5,
        jobsAmountPercentage: 8,
        time: 5,
        timePercentage: 8,
      },
    ],
  },
};
