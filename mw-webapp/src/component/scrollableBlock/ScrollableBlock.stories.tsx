import {Meta, StoryObj} from "@storybook/react";
import {ScrollableBlock} from "src/component/scrollableBlock/ScrollableBlock";
import {Text} from "src/component/text/Text";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";

const meta: Meta<typeof ScrollableBlock> = {
  title: "ScrollableBlock",
  component: ScrollableBlock,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScrollableBlock>;

const longContent = Array.from({length: 50}, (_, i) => (
  <Text
    key={i}
    text="Item: This is a long list item with some content"
  />
));

export const Default: Story = {
  args: {
    children: (
      <VerticalContainer>
        {longContent}
      </VerticalContainer>
    ),
  },
};

export const FixedDimensions: Story = {
  args: {
    width: "200px",
    height: "700px",
    children: (
      <VerticalContainer>
        {longContent}
      </VerticalContainer>
    ),
  },
};

export const WideBlock: Story = {
  args: {
    width: "600px",
    height: "150px",
    children: (
      <div>
        <Text text="This is a wide scrollable block with horizontal content that might overflow" />
        <Text text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua."
        />
        <Text text="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat."
        />
      </div>
    ),
  },
};
