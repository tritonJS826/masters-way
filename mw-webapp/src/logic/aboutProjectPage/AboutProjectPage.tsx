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
    {
      trigger: <AccordionTrigger text="What is the Master's Way?" />,
      content:
  <AccordionContent text="Master's Way is an app to track your learning.
	 You can record your progress, set goals, and share data with
	 a mentor or other users."
  />,
    },
    {
      trigger: <AccordionTrigger text="What is the Way?" />,
      content:
  <AccordionContent text="The “Way” in our application is the path along
   which you learn or develop. This route includes training, tasks and goals that you set for yourself."
  />,
    },
    {
      trigger: <AccordionTrigger text="How can I start using the application?" />,
      content:
  <AccordionContent text="First, you need to register and create an account.
	 After this you can start recording your Way"
  />,
    },
    {
      trigger: <AccordionTrigger text="How can I share data with a mentor?" />,
      content:
  <AccordionContent text="In your profile settings, you can add a
  mentor contact and give him access to your data. He will be able to see your progress and help you."
  />,
    },
  ];

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="About project page"
      />

      <Title
        level={HeadingLevel.h3}
        text="FAQ"
        className={styles.titleAccordion}
      />
      <Accordion
        items={accordionItems}
        type={accordionTypes.multiple}
        className={styles.accordion}
      />
    </>
  );
};
