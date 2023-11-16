import {
  Header as RadixAccordionHeader,
  Trigger as RadixAccordionTrigger,
} from "@radix-ui/react-accordion";
import {ChevronDownIcon} from "@radix-ui/react-icons";
import styles from "src/component/accordion/AccordionTrigger/AccordionTrigger.module.scss";

/**
 * Props for the {@link AccordionTrigger} component.
 */
export interface AccordionTriggerProps {

  /**
   * The child to be displayed within the AccordionTrigger.
   */
  child: React.ReactNode;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;
}

/**
 * A component representing the trigger (header) of an individual item within the Accordion.
 * It displays a text label and an optional chevron icon for expanding/collapsing the item.
 */
export const AccordionTrigger = (props: AccordionTriggerProps) => {
  return (
    <RadixAccordionHeader
      className={styles.accordionHeader}
      data-cy={props.dataCy}
    >
      <RadixAccordionTrigger className={styles.accordionTrigger}>
        {props.child}
        <ChevronDownIcon
          className={styles.accordionChevron}
          aria-hidden
        />
      </RadixAccordionTrigger>
    </RadixAccordionHeader>
  );
};
