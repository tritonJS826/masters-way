import React, {ReactElement} from "react";
import {Root as RadixAccordionRoot} from "@radix-ui/react-accordion";
import clsx from "clsx";
import {AccordionContentProps} from "src/component/accordion/AccordionContent";
import {AccordionItem} from "src/component/accordion/AccordionItem";
import {AccordionTriggerProps} from "src/component/accordion/AccordionTrigger";
import styles from "src/component/accordion/Accordion.module.scss";

/**
 * Enum defines the available modes of operation for the accordion component.
 */
export enum accordionTypes {
  /**
   * Single mode (`"single"`) - In this mode, only one accordion item can be open at a time.
   * If a user opens one item, any previously open item will automatically close.
   */
  single = "single",

  /**
   * Multiple mode (`"multiple"`) - In this mode, multiple accordion items can be open simultaneously.
   * Previously open items remain open when the user opens additional items.
   */
  multiple = "multiple",
}

interface AccordionProps {
  /**
   * An array of React elements representing accordion items, each with a trigger and content.
   */
  items: Array<{
    trigger: ReactElement<AccordionTriggerProps>;
    content: ReactElement<AccordionContentProps>;
  }>;
  /**
   * The mode of operation for the accordion.
   * @type {accordionTypes}
   */
  type?: accordionTypes;
  /**
   * Additional custom class name for the component
   */
  className?: string;
}

/**
 * This component renders a vertically stacked set of interactive headings that each reveal an associated section of content.
 */
export const Accordion = (props: AccordionProps) => {
  const generateItemKey = (index: number): string => `item-${index}`;

  return (
    <RadixAccordionRoot
      className={clsx(styles.accordionRoot, props.className)}
      type={props.type ?? accordionTypes.single}
    >
      {props.items.map((item, index) => {
        return (
          <AccordionItem
            trigger={item.trigger}
            content={item.content}
            itemKey={generateItemKey(index)}
            key={generateItemKey(index)}
          />
        );
      })}
    </RadixAccordionRoot>
  );
};
