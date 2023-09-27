import type {StoryObj} from "@storybook/react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AccordionContent} from "src/component/accordion/AccordionContent";
import {AccordionTrigger} from "src/component/accordion/AccordionTrigger";

const meta = {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const itemsExample = [
  {
    trigger: <AccordionTrigger text={"Is it accessible?"} />,
    content: <AccordionContent text={"Yes. It adheres to the WAI-ARIA design pattern."} />,
  },
  {
    trigger: <AccordionTrigger text={"Is it unstyled?"} />,
    content: <AccordionContent text={"Yes. It's unstyled by default, giving you freedom over the look and feel."} />,
  },
  {
    trigger: <AccordionTrigger text={"Can it be animated?"} />,
    content: <AccordionContent text={"Yes! You can animate the Accordion with CSS or JavaScript."} />,
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
        trigger: <AccordionTrigger text={"Is it accessible?"} />,
        content: <AccordionContent text={"Yes. It adheres to the WAI-ARIA design pattern."} />,
      },
    ],
  },
};
