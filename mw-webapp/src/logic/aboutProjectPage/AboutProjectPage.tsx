
import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {AccordionContent} from "src/component/accordion/AccordionContent/AccordionContent";
import {AccordionTrigger} from "src/component/accordion/AccordionTrigger/AccordionTrigger";
import {HeadingLevel, Title} from "src/component/title/Title";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

/**
 * About project page
 */
export const AboutProjectPage = () => {

  /**
   * Accordion props
   */
  const accordionItems = [
    {trigger: <AccordionTrigger text="What is your name" />, content: <AccordionContent text="Master" />},
    {trigger: <AccordionTrigger text="What is your last name" />, content: <AccordionContent text="Way" />},
  ];

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="About project page"
      />
      <>
        <Title
          level={HeadingLevel.h3}
          text="FAQ accordion"
          className={styles.titleAccordion}
        />
        <Accordion
          items={accordionItems}
          type={accordionTypes.multiple}
          className={styles.accordion}
        />
      </>

    </>
  );
};
