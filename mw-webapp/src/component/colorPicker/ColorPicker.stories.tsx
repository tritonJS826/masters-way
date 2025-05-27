import {Meta, StoryObj} from "@storybook/react";
import {ColorPicker} from "src/component/colorPicker/ColorPicker";

const meta: Meta<typeof ColorPicker> = {
  title: "ColorPicker",
  component: ColorPicker,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "red",
    onChange: () => {},
  },
};
