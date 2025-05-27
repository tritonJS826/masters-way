import {Meta, StoryObj} from "@storybook/react";
import {Text} from "src/component/text/Text";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";

const meta: Meta<typeof VerticalContainer> = {
  title: "VerticalContainer",
  component: VerticalContainer,
  parameters: {layout: "centered"},
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof VerticalContainer>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Text text="First item" />
        <Text text="Second item" />
        <Text text="Third item" />
      </div>
    ),
  },
};
