import {Accordion, accordionTypes} from "src/component/accordion/Accordion";
import {HeadingLevel, Title} from "src/component/title/Title";
import accordionData from "src/logic/aboutProjectPage/AboutProjectPageAccordionData.json";
import {jsonWithLineBreakToReact} from "src/utils/textUtils/jsonToLineBreak";
import styles from "src/logic/aboutProjectPage/AboutProjectPage.module.scss";

const accordionItems = accordionData.map((data) => ({
  trigger: {child: data.header.ru},
  content: {child: jsonWithLineBreakToReact(data.description.ru)},
}));

/**
 * About project page
 */
export const AboutProjectPage = () => {

  return (
    <>
      <Title
        level={HeadingLevel.h2}
        text="About project page"
      />

      <Title
        level={HeadingLevel.h3}
        text="FAQ"
      />

      <Accordion
        items={accordionItems}
        type={accordionTypes.multiple}
        className={styles.accordion}
      />
    </>
  );
};
