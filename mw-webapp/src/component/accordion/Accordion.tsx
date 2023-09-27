import React, {Children, ReactElement} from "react";
import {Root as RadixAccordionRoot} from "@radix-ui/react-accordion";
import clsx from "clsx";
import {AccordionItem} from "src/component/accordion/AccordionItem";
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
   * An array of React elements representing the items to be displayed within the accordion.
   */
  children: ReactElement<AccordionItem>[];

  /**
   * The mode of operation for the accordion.
   * @type {accordionTypes}
   */
  type: accordionTypes;
  /**
   * Additional custom class name for the component
   */
  className?: string;
}

/**
 * This component renders a vertically stacked set of interactive headings that each reveal an associated section of content.
 */
export function Accordion(props: AccordionProps) {
  return (
    <RadixAccordionRoot
      className={clsx(styles.accordionRoot, props.className)}
      type={props.type}
    >
      {Children.map(props.children, (child, index) => {
        const itemKey = `item-${index}`;
        return React.cloneElement(child, {itemKey});
      })}
    </RadixAccordionRoot>
  );
}
