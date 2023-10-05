import {ReactElement, useId} from "react";
import {Root as RadixAccordionRoot} from "@radix-ui/react-accordion";
import clsx from "clsx";
import {AccordionContentProps} from "src/component/accordion/AccordionContent/AccordionContent";
import {AccordionItem} from "src/component/accordion/AccordionItem/AccordionItem";
import {AccordionTriggerProps} from "src/component/accordion/AccordionTrigger/AccordionTrigger";
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

/**
 * Accordion item data
 */
interface AccordionItemData {
  /**
   * The trigger element that users can interact with to expand or collapse the item.
   */
  trigger: ReactElement<AccordionTriggerProps>;
  /**
   * The content element that becomes visible when the item is expanded.
   */
  content: ReactElement<AccordionContentProps>;
}

/**
 * ACcordion props
 */
interface AccordionProps {
  /**
   * An array of objects representing the accordion items, each containing a trigger and content element.
   */
  items: AccordionItemData[];
  /**
   * The mode of operation for the accordion. (Optional)
   * @type {accordionTypes}
   * @default "single"
   */
  type?: accordionTypes;
  /**
   * Additional custom class name for the component (Optional)
   */
  className?: string;
}

/**
 * Accordion item component
 * @param {AccordionItemData} item
 * @param {string} uniqueId
 */
const renderAccordionItem = (item: AccordionItemData, uniqueId: string) => (
  <AccordionItem
    trigger={item.trigger}
    content={item.content}
    itemKey={uniqueId}
    key={uniqueId}
  />
);

/**
 * This component renders a vertically stacked set of interactive headings that each reveal an associated section of content.
 */
export const Accordion = (props: AccordionProps) => {
  return (
    <RadixAccordionRoot
      className={clsx(styles.accordionRoot, props.className)}
      type={props.type ?? accordionTypes.single}
    >
      {props.items.map((item) => {
        const uniqueId = useId();

        return renderAccordionItem(item, uniqueId);
      })}
    </RadixAccordionRoot>
  );
};
