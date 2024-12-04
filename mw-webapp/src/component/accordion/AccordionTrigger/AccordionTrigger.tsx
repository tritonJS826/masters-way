import {
  Header as RadixAccordionHeader,
  Trigger as RadixAccordionTrigger,
} from "@radix-ui/react-accordion";
import clsx from "clsx";
import {Icon, IconSize} from "src/component/icon/Icon";
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
      data-testid={props.dataCy}
    >
      <RadixAccordionTrigger className={styles.accordionTrigger}>
        {props.child}
        <>
          <Icon
            size={IconSize.MEDIUM}
            name={"PlusIcon"}
            className={clsx(styles.icon, styles.plusIcon)}
          />
          <Icon
            size={IconSize.MEDIUM}
            name={"MinusIcon"}
            className={clsx(styles.icon, styles.minusIcon)}
          />
        </>
      </RadixAccordionTrigger>
    </RadixAccordionHeader>
  );
};
