import type {StoryObj} from "@storybook/react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";

const meta = {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const itemsExample = [
  {
    trigger: {child: "Is it accessible?"},
    content: {child: "Yes. It adheres to the WAI-ARIA design pattern."},
  },
  {
    trigger: {child: "Is it unstyled?"},
    content: {child: "Yes. It's unstyled by default, giving you freedom over the look and feel."},
  },
  {
    trigger: {child: "Can it be animated?"},
    content: {child: "Yes! You can animate the Accordion with CSS or JavaScript."},
  },
];

export const Default: Story = {args: {items: itemsExample}};

export const MultipleMode: Story = {
  args: {
    type: accordionTypes.multiple,
    className: "accordion-example",
    items: itemsExample,
  },
};

export const SingleItem: Story = {
  args: {
    type: accordionTypes.multiple,
    className: "accordion-example",
    items: [
      {
        trigger: {child: "Is it accessible?"},
        content: {child: "Yes. It adheres to the WAI-ARIA design pattern."},
      },
    ],
  },
};
