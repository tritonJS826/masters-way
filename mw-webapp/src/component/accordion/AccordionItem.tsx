import {Children, ReactElement} from "react";
import {Item as RadixAccordionItem} from "@radix-ui/react-accordion";
import {AccordionContentProps} from "src/component/accordion/AccordionContent";
import {AccordionTriggerProps} from "src/component/accordion/AccordionTrigger";
import styles from "src/component/accordion/AccordionItem.module.scss";

/**
 * Props for an individual item within the Accordion component.
 */
export interface AccordionItem {
  /**
   * * An array of React elements representing the content of the AccordionItem.
   * These elements should include AccordionTrigger and AccordionContent components.
   */
  children: ReactElement<AccordionTriggerProps | AccordionContentProps>[];
  /**
   *  A unique key to identify the AccordionItem.
   */
  itemKey?: string;
}

/**
 * A component representing an individual item within the Accordion.
 * It should be used as a child of the Accordion component.
 */
export const AccordionItem = (props: AccordionItem) => {
  return (
    <RadixAccordionItem
      className={styles.accordionItem}
      value={props.itemKey!}
    >
      {Children.map(props.children, (child) => child)}
    </RadixAccordionItem>
  );
};
