import {Meta, StoryObj} from "@storybook/react";
import {LabelColors} from "cypress/testData/testData";
import {Label} from "src/component/label/Label";
import {Label as LabelModel} from "src/model/businessModel/Label";

const meta: Meta<typeof Label> = {
  title: "Label",
  component: Label,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Label>;

const sampleLabel = new LabelModel({
  uuid: "1",
  name: "Frontend",
  color: LabelColors.blue,
  description: "Frontend development tasks",
});

export const Default: Story = {args: {label: sampleLabel}};

export const SmallSize: Story = {
  args: {
    label: sampleLabel,
    isSmall: true,
  },
};

