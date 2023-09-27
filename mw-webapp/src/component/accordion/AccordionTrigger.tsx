import {
  Header as RadixAccordionHeader,
  Trigger as RadixAccordionTrigger,
} from "@radix-ui/react-accordion";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import styles from "src/component/accordion/AccordionTrigger.module.scss";

/**
 * Props for the AccordionTrigger component.
 */
export interface AccordionTriggerProps{
  /**
   * The text to be displayed within the AccordionTrigger.
   */
  text: string;
}

/**
 * A component representing the trigger (header) of an individual item within the Accordion.
 * It displays a text label and an optional chevron icon for expanding/collapsing the item.
 */
export function AccordionTrigger(props: AccordionTriggerProps) {
  return (
    <RadixAccordionHeader className={styles.AccordionHeader}>
      <RadixAccordionTrigger className={styles.AccordionTrigger}>
        {props.text}
        <ChevronDownIcon
          className={styles.AccordionChevron}
          aria-hidden
        />
      </RadixAccordionTrigger>
    </RadixAccordionHeader>
  );
}
