import {Content} from "@radix-ui/react-accordion";
import styles from "src/component/accordion/AccordionContent.module.scss";

/**
 * Props for the AccordionContent component.
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
export function AccordionContent(props: AccordionContentProps) {
  return (
    <Content className={styles.accordionContent}>
      <div className={styles.accordionContentText}>
        {props.text}
      </div>
    </Content>
  );
}
