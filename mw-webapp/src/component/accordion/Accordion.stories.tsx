import type {StoryObj} from "@storybook/react";
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AccordionContent} from "src/component/accordion/AccordionContent";
import {AccordionItem} from "src/component/accordion/AccordionItem";
import {AccordionTrigger} from "src/component/accordion/AccordionTrigger";

const meta = {
  title: "Accordion",
  component: Accordion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const childrenExample = [
  <AccordionItem key="item-1">
    <AccordionTrigger text={"Is it accessible?"} />
    <AccordionContent text={"Yes. It adheres to the WAI-ARIA design pattern."} />
  </AccordionItem>,
  <AccordionItem key="item-2">
    <AccordionTrigger text={"Is it unstyled?"} />
    <AccordionContent text={"Yes. It's unstyled by default, giving you freedom over the look and feel."} />
  </AccordionItem>,
  <AccordionItem key="item-3">
    <AccordionTrigger text={"Can it be animated?"} />
    <AccordionContent text={"Yes! You can animate the Accordion with CSS or JavaScript."} />
  </AccordionItem>,
];

export const Default: Story = {
  args: {
    type: accordionTypes.single,
    className: "accordion-example",
    children: childrenExample,
  },
};

export const MultipleMode: Story = {
  args: {
    type: accordionTypes.multiple,
    className: "accordion-example",
    children: childrenExample,
  },
};

export const SingleItem: Story = {
  args: {
    type: accordionTypes.multiple,
    className: "accordion-example",
    children: [
      <AccordionItem key="item-1">
        <AccordionTrigger text={"Is it accessible?"} />
        <AccordionContent text={"Yes. It adheres to the WAI-ARIA design pattern."} />
      </AccordionItem>,
    ],
  },
};
