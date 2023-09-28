import {Content as RadixAccordionContent} from "@radix-ui/react-accordion";
import styles from "src/component/accordion/AccordionContent/AccordionContent.module.scss";

/**
 * Props for the {@link AccordionContent} component.
 */
export interface AccordionContentProps {
  /**
   * The text content to be displayed within the AccordionContent.
   */
  text: string;
}

/**
 * A component representing the content of an individual item within the Accordion.
 * It displays the text content associated with the AccordionTrigger.
 */
export const AccordionContent = (props: AccordionContentProps) => {
  return (
    <RadixAccordionContent className={styles.accordionContent}>
      <div className={styles.accordionContentText}>
        {props.text}
      </div>
    </RadixAccordionContent>
  );
};
