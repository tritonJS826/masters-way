import {ReactElement} from "react";
import {Item as RadixAccordionItem} from "@radix-ui/react-accordion";
import {AccordionContentProps} from "src/component/accordion/AccordionContent/AccordionContent";
import {AccordionTriggerProps} from "src/component/accordion/AccordionTrigger/AccordionTrigger";
import styles from "src/component/accordion/AccordionItem/AccordionItem.module.scss";

/**
 * Props for the {@link AccordionItem} component.
 */
export interface AccordionItem {

  /**
   * React element representing the trigger for this AccordionItem.
   */
  trigger: ReactElement<AccordionTriggerProps>;

  /**
   * React element representing the content for this AccordionItem.
   */
  content: ReactElement<AccordionContentProps>;

  /**
   * A unique key to identify the AccordionItem.
   */
  itemKey: string;
}

/**
 * A component representing an individual item within the Accordion.
 * It should be used as a child of the Accordion component.
 */
export const AccordionItem = (props: AccordionItem) => {
  return (
    <RadixAccordionItem
      className={styles.accordionItem}
      value={props.itemKey}
    >
      {props.trigger}
      {props.content}
    </RadixAccordionItem>
  );
};
